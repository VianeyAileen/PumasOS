import pymysql
from app import app
from db import mysql
from mail import email
from flask import jsonify
from flask import flash, request
from werkzeug.security import generate_password_hash
from flask_mail import Message

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
            mail()
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
        return jsonify('error al registrar al comprador')
    finally:
        if conn is not None and cursor is not None:
            print("verificacion del if")
            cursor.close()
            conn.close()

def mail():
    msg = Message('BreakBlue Market', sender = 'dicter05@gmail.com', recipients = ['dicteraulad@ciencias.unam.mx'])
    msg.body = "Haz sido registrado con exito en BreakBlue Market"
    email.send(msg)


#Método para obtener a un comprador a través del email
@app.route('/comprador/<string:correo>', methods=["GET"])
def obtener_comprador(correo):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM comprador WHERE correo = %s", correo)
        row = cursor.fetchone()
        resp = jsonify(row)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404
    return resp
