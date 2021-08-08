import pymysql
from app import app
from db import mysql
from flask import jsonify, request
from werkzeug.security import generate_password_hash

@app.route('/comprador', methods=['POST'])
def añadir_comprador():
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
            sql = "INSERT INTO comprador(correo, nombre, apellidos, contrasena, nombreUsuario) VALUES (%s, %s, %s, %s, %s)"
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
        return e
    finally:
        cursor.close()
        conn.close()


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


if __name__ == "__main__":
    app.run(debug=True)