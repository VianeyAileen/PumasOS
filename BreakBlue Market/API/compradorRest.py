import pymysql
from app import app
from db import mysql
from mail import email
from flask import jsonify, session
from flask import flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Message
from flask_login import logout_user

#funcion que registra a un usuario de tipo comprador
@app.route('/comprador', methods=['POST'])
def aniadir_comprador():
    conn = None
    cursor = None
    try:
        _json = request.json
        correo = _json['correo']
        nombre = _json['nombre']
        apellidos = _json['apellidos']
        contrasena = _json['contrasena']
        nombreUsuario = _json['nombreUsuario']
        genero = _json['genero']
        edad = _json['edad']

        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        duplicado = cursor.execute("SELECT * FROM vendedor WHERE correo = %s", correo)
        if duplicado != 0:
            return jsonify('correo ya registrado')
        if correo and nombre and apellidos and contrasena and nombreUsuario and genero and edad and request.method == 'POST':
            contrasena_hash = generate_password_hash(contrasena)
            sql = "INSERT INTO comprador(correo, nombre, apellidos, contrasena, nombreUsuario, genero, edad) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            data = (correo, nombre, apellidos, contrasena_hash, nombreUsuario, genero, edad)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Usuario comprador añadido correctamente')
            mail(correo)
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
        return jsonify('error al registrar al comprador')
    finally:
        if conn is not None and cursor is not None:
            print('error correo duplicado en la tabla')
            cursor.close()
            conn.close()

#funcion que crea un mensaje y manda un email al usuario registrado.
def mail(correo):
    msg = Message('BreakBlue Market', sender = 'breakbluemarket@gmail.com', recipients = [correo])
    msg.body = "Has sido registrado con exito en BreakBlue Market"
    email.send(msg)

# Método para inicair sesión del comprador
@app.route('/login', methods=['GET','POST'])
def loginComprador():
    conn = None
    cursor = None

    try:
        _json = request.json
        correo = _json['correo']
        contrasena = _json['contrasena']

        # validamos los parámteros recividos
        if correo and contrasena:
            #verificamos al usuario
            conn = mysql.connect()
            cursor = conn.cursor()

            sql = "SELECT * FROM comprador WHERE correo=%s"
            sql_where = (correo)

            cursor.execute(sql, sql_where)
            row = cursor.fetchone()

            if row:
                if check_password_hash(row[3], contrasena):
                    session['correo'] = row[1]
                    return jsonify({'message': 'Inicio de sesión exitosó'})
                else:
                    resp = jsonify({'messsage': 'Bad Request - contraseña inválida'})
                    resp.status_code = 400
                    return resp
        else:
            resp = jsonify({'message': 'Bad Request - credenciales inválidas'})
            resp.status_code = 400
            return resp
    except Exception as e:
        print(e)
    finally:
        if cursor and conn:
            cursor.close()
            conn.close()

#funcion que nos ayuda a cerrar la sesion del comprador.
@app.route("/cerrarsesion")
def cerrarSesionComprador():
    if 'correo' in session:
        session.pop('correo', None)
    return jsonify('has salido de la sesion correctamente')

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp
