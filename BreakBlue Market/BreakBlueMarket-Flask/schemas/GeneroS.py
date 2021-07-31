from app import ma

class GeneroEsquema(ma.Schema):
    class Meta:
        field = ('correo', 'genero')