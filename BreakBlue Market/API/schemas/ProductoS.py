from app import ma

class ProductoEsquema(ma.Schema):
    class Meta:
        field = ('id', 'nombre', 'precio', 'marca', 'descripcion', 'unidadesDisponibles', 'comentario', 'correo', 'imagen')
