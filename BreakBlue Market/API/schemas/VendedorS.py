from app import ma

class VendedorEsquema(ma.Schema):
    class Meta:
        field = ('correo', 'nombre', 'apellidos', 'contrasena', 'nombreUsuario', 'genero', 'edad')
