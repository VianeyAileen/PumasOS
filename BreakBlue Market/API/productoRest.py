import pymysql
from pymysql.cursors import DictCursor
from app import app
from db import mysql
from flask import jsonify
from flask import request

#Metodo para obtener todos los productos
@app.route('/producto', methods=['GET'])
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
@app.route('/producto/<string:nombre>', methods=['GET'])
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
        print(id)
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("UPDATE producto SET unidadesDisponibles = (unidadesDisponibles - 1) WHERE id = %s", id )
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
        descripcion = _json['descripcion']
        unidadesDisponibles = _json['unidadesDisponibles']
        imagen = _json['unidadesDisponibles']

        if nombre and precio and descripcion and unidadesDisponibles and imagen and request.method == 'PUT':
            #save edits
            sql = "UPDATE producto SET nombre = %s, precio = %s, descripcion = %s, unidadesDisponibles = %s, imagen = %s WHERE id = %s"  
            data = (nombre, precio, descripcion, unidadesDisponibles, imagen, id)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Producto Actualizado')
            resp.status_code = 200
            return resp
    except Exception as e:
        print(e)
        return jsonify("Error al actualizar")
    finally:
        cursor.close()
        conn.close()

#Metodo para consultar las calificaciones
@app.route('/calificacion/<int:id>', methods=['GET'])
def obtener_calificacion(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT calificacion FROM calificacion WHERE id = %s",id)
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
@app.route('/comentario/<int:id>', methods=['GET'])
def obtener_comentario(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT comentario FROM comentario WHERE id = %s",id)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Metodo para subir un comentario
@app.route('/comentario/<int:id>', methods=['POST'])
def subir_comentario(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        comentario = _json['comentario']

        if comentario and request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            sql = "INSERT INTO comentario (id, comentario) VALUES ( %s, %s)"
            data = (id, comentario)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify("Comentario añadido correctamente")
            resp.status_code = 200
            return resp
        else :
            resp = jsonify("No se agrego un comentario")
            resp.status_code = 400
            return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Metodo para subir una calificacion
@app.route('/calificacion/<int:id>', methods=['POST'])
def subir_calificacion(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        calificacion = _json['calificacion']
        
        if calificacion and request.method == 'POST':
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            sql = "INSERT INTO calificacion (id, calificacion) VALUES (%s, %s)"
            data = (id, calificacion)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify("Calificacion añadida correctamente")
            resp.status_code = 200
            return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

#Metodo para eliminar un producto
@app.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminar_producto(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        sql = "DELETE t1,t2, t3, t4 FROM producto t1 LEFT JOIN imagen t2 ON (t2.id=t1.id) LEFT JOIN comentario t3 ON(t3.id=t1.id) LEFT JOIN calificacion t4 ON(t4.id=t1.id) WHERE t1.id=%s;"
        cursor.execute(sql,id)
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
@app.route('/altaProducto', methods=['POST'])
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
        correo = _json['correo']
        imagen = _json['imagen']

        if nombre and precio and marca and descripcion and unidadesDisponibles and correo and imagen and request.method == 'POST':
            #save edits
            sql = "INSERT INTO producto (nombre, precio, marca, descripcion, unidadesDisponibles, correo, imagen) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            data = (nombre, precio, marca, descripcion, unidadesDisponibles, correo, imagen)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Producto agregado')
            resp.status_code = 200
            return resp
    except Exception as e:
        print(e) 
    finally:
        cursor.close()
        conn.close()

#Metodo para agregar una imagen
@app.route('/imagen/<int:id>', methods=['POST'])        
def agregar_imagen(id):
    conn = None
    cursor = None
    print(request.json)
    try:
        _json = request.json
        imagen = _json['imagen']
        print("id => "+ id)
        
        if imagen and request.method == 'POST':
            sql = "INSERT INTO imagen (id, imagen) VALUES (%s, %s)"
            data = (id, imagen)
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute(sql, data)
            conn.commit()
            resp = jsonify('Imagen agregada')
            resp.status_code = 200
            return resp  
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

# Metodo para consultar las imagenes de un producto
@app.route('/imagen/<int:id>', methods=['GET'])
def obtener_imagen(id):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT imagen FROM producto WHERE id = %s",id)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@app.route('/imagen/<int:id>', methods=["PUT"])
def actualizar_imagen(id):
    conn = None
    cursor = None
    try:
        _json = request.json
        _imagen = _json['imagenNueva']
        sql = "UPDATE producto SET imagen = %s WHERE id = %s"
        data = (_imagen, id)
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('Imagen actualizada')
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