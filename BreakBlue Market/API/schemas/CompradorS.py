from app import ma

class CompradorEsquema(ma.Schema):
    class Meta:
        field = ('correo', 'nombre', 'apellidos', 'contrasena', 'nombreUsuario', 'genero', 'edad')
