import pymysql
from app import app
from db import mysql
from flask import jsonify
from flask import request

#Eliminar un producto
@app.route('/delete/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM producto WHERE id=%s", (id,))
        conn.commit()
        resp = jsonify('Producto eliminado')
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Agregar un producto
@app.route('/add', methods=['POST'])
def agregar_producto():
    conn = None
    cursor = None
    try:
        _json = request.json
        nombre = _json['nombre']
        precio = _json['precio']
        marca = _json['marca']
        descripcion = _json['descripcion']
        unidadesDisponibles = _json['unidadesDisponibles']
        imagen = _json['imagen']
        calificacion = _json['calificacion']
        comentario = _json['comentario']
        correo = _json['correo']

        if nombre and precio and marca and descripcion and unidadesDisponibles and imagen and calificacion and comentario and correo and request.method == 'POST':
            #save edits
            sql = "INSERT INTO producto (nombre, precio, marca, descripcion, unidadesDisponibles, imagen, calificacion, comentario, correo) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            data = (nombre, precio, marca, descripcion, unidadesDisponibles, imagen, calificacion, comentario, correo)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Producto agregado')
            resp.status_code = 200
            return resp
        else:
            return not_found()
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
    app.run()