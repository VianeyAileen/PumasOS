from app import ma

class CalificacionEsquema(ma.Schema):
    class Meta:
        field = ('id', 'calificacion')