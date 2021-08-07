import pymysql
from pymysql.cursors import DictCursor
from app import app
from db import mysql
from flask import jsonify
from flask import flash, request

@app.route('/product', methods=['GET'])
def get_products():
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM producto")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@app.route('/product/<string:nombre>', methods=['GET'])
def get_product(nombre):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM producto WHERE nombre =  %s ", nombre)
        row = cursor.fetchall()
        resp = jsonify(row)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@app.route("/comprar/<int:id>", methods=['PUT'])
def purchase_product(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("UPDATE producto SET unidadesDisponibles = unidadesDisponibles - 1 WHERE id = %s", id )
        row = cursor.fetchone()
        resp = jsonify("El producto fue comprado exitosamente")
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Actualizar un producto
@app.route('/actualizar/<int:id>', methods=['PUT'])
def actualizar_producto(id):
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

        if nombre and precio and marca and descripcion and unidadesDisponibles and imagen and calificacion and comentario and correo and request.method == 'PUT':
            #save edits
            sql = "UPDATE producto SET nombre = %s, precio = %s, marca = %s, descripcion = %s, unidadesDisponibles = %s, imagen = %s, calificacion = %s, comentario = %s, correo = %s WHERE id = %s"  
            data = (nombre, precio, marca, descripcion, unidadesDisponibles, imagen, calificacion, comentario, correo, id)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Producto Actualizado')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Consultar calificacion
@app.route('/calificacion', methods=['GET'])
def get_calificacion():
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT calificacion FROM producto")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Consultar Comentario
@app.route('/comentario', methods=['GET'])
def get_comentario():
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT comentario FROM producto")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


#Agregar opinion y comentario de producto
@app.route('/addOp/<int:id>', methods=['POST'])
def agregar_opiyCalif(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        calificacion = _json['calificacion']
        comentario = _json['comentario']

        if calificacion and comentario and request.method == 'POST':
            #save edits
            sql = "UPDATE producto SET calificacion = %s, comentario = CONCAT(comentario,%s) WHERE id = %s"
            data = (calificacion, comentario, id)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Opinión y Calificación agregada')
            resp.status_code = 200
            return resp
        else:
            return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


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