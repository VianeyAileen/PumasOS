from app import ma

class ImagenEsquema(ma.Schema):
    class Meta:
        field = ('id', 'imagen')