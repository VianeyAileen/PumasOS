from app import ma

class TipoUsuarioEsquema(ma.Schema):
    class Meta:
        field = ('correo', 'tipoUsuario')