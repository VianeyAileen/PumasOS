import pymysql
from pymysql.cursors import DictCursor
from app import app
from db import mysql
from flask import jsonify
from flask import flash, request


#Metodo para obtener todos los productos
@app.route('/product', methods=['GET'])
def obtener_productos():
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

#Metodo para obtener un producto por su nombre
@app.route('/product/<string:nombre>', methods=['GET'])
def obtener_producto(nombre):
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

#Metodo para comprar un producto 
@app.route("/comprar/<int:id>", methods=['PUT'])
def comprar_producto(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("UPDATE producto SET unidadesDisponibles = unidadesDisponibles - 1 WHERE id = %s", id )
        row = cursor.fetchone()
        conn.commit()
        resp = jsonify("El producto fue comprado exitosamente")
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Metodo para actualizar un producto
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

#Metodo para consultar las calificaciones
@app.route('/calificacion', methods=['GET'])
def obtener_calificacion():
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

#Metodo para consultar los Comentarios
@app.route('/comentario', methods=['GET'])
def obtener_comentario():
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


#Metodo para agregar opinion y calificacion de producto
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

#Metodo para agregar opinion de producto
@app.route('/addOp/<int:id>', methods=['POST'])
def agregar_opinion(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        comentario = _json['comentario']

        if  comentario and request.method == 'POST':
            #save edits
            sql = "UPDATE producto SET comentario = CONCAT(comentario,%s) WHERE id = %s"
            data = (comentario, id)
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

#Metodo para agregar calificacion de producto
@app.route('/addOp/<int:id>', methods=['POST'])
def agregar_Calificacion(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        calificacion = _json['calificacion']

        if calificacion and request.method == 'POST':
            #save edits
            sql = "UPDATE producto SET calificacion = %s WHERE id = %s"
            data = (calificacion, id)
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


#Metodo para eliminar un producto
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

#Metodo para agregar un producto
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
    app.run(debug=True)