from app import ma

class ProductoEsquema(ma.Schema):
    class Meta:
        field = ('id', 'nombre', 'descripcion', 'unidadesDisponibles', 'comentario', 'correo', 'imagen')
