import pymysql
from app import app
from db import mysql
from flask import jsonify
from flask import flash, request
from werkzeug.security import generate_password_hash, check_password_hash

# Método para agregar a un vendedor
@app.route('/vendedor', methods=['POST'])
def añadir_vendedor():
    conn = None
    cursor = None
    try:
        _json = request.json
        correo = _json['correo']
        nombre = _json['nombre']
        apellidos = _json['apellidos']
        contrasena = _json['contrasena']
        nombreUsuario = _json['nombreUsuario']

        if correo and nombre and apellidos and contrasena and nombreUsuario and request.method == 'POST':
            contrasena_hash = generate_password_hash(contrasena)
            print(len(contrasena_hash))
            sql = "INSERT INTO vendedor(correo, nombre, apellidos, contrasena, nombreUsuario) VALUES (%s, %s, %s, %s, %s)"
            data = (correo, nombre, apellidos, contrasena_hash, nombreUsuario)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Usuario añadido correctamente')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


# Método para obtener a un vendedor
@app.route('/login/<string:correo>', methods=["GET"])
def obtener_vendedor(correo):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM vendedor WHERE correo = %s")
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
