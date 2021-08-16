from flask_cors import CORS 

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