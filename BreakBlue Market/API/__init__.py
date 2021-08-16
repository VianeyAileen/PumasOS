from flask_cors import CORS 
from flask import session, jsonify
from app import app

#funcion que nos ayuda a cerrar la sesion del comprador.
@app.route("/cerrarsesionUser")
def cerrarsesion():
    if 'correo' in session:
            session.pop('correo', None)
    return jsonify('haz salido de la sesion correctamente')

if __name__ == "__main__":
    from app import app
    app.config['CORS_HEADERS'] = 'Content-Type'
    CORS(app)
    cors = CORS(app, resources = {r"*" : {"origins" : "http://localhost:5000/"}})
    import importlib
    importlib.import_module('compradorRest')
    importlib.import_module('productoRest')
    importlib.import_module('vendedorRest')
    app.run(debug=True)