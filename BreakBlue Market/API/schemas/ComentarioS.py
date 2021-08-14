from app import ma

class ComentarioEsquema(ma.Schema):
    class Meta:
        field = ('id', 'comentario')