if __name__ == "__main__":
    from app import app
    import importlib
    importlib.import_module('compradorRest')
    importlib.import_module('productoRest')
    importlib.import_module('vendedorRest')
    app.run(debug=True)