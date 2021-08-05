import pymysql
from app import app
from db import mysql
from flask import jsonify
#from werkzeug import generate_password_hash, check_password_hash
# from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/vendedor/<string:correo>')
def get_vendedor(correo):
    conn = None
    cursor = None
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM vendedor WHERE correo = %s", correo)
        row = cursor.fetchone()
        resp = jsonify(row)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run()