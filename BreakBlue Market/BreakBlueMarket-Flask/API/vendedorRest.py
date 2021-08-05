import pymysql
from app import app
from db import mysql
from flask import jsonfy
from flask import flash, request

@app.route('/vendedor', methods=['POST'])
    def add_user():
        conn = None
        cursor = None
        try:
            json = request.json
            correo = _json['correo']
            nombre = _json['nombre']
            apellidos = _json['apellidos']
            contrasena = _json['contraseña']
            nombreUsuario = _json['nombreUsuario']

            if correo and nombre and apellidos and contrasena and nombreUsuario and request.method == 'PUT':
                contrasena_hash = generate_password_hash(contrasena)
                sql = "INSERT INTO comprador(correo, nombre, apellidos, contrasena, nombreUsuario) VALUES (%s, %s, %s, %s, %s)"
                data(correo, nombre, apellidos, contrasena_hash, nombreUsuario)
                conn = mysql.connect()
                cursor = conn.cursor(pymysql.cursors.DictCursor)
                cursor.execute(sql, data)
                conn.commit()
                resp = jsonfy('Usuario añadido correctamente')
                resp.status_code = 200
                return resp
            else:
                return not_found()
            except Exception as e:
                print(e)
            finally:
                cursor.close()
                conn.close()

    if __name__ == "__main__":
    app.run()
