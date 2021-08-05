from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__='producto'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    nombre = db.Column(db.Unicode)
    marca = db.Column(db.Unicode)
    descripcion = db.Column(db.Unicode)
    unidadesDisponibles = db.Column(db.Integer)
    # imagen = db.Column(db.)
    calificacion = db.Column(db.Float)
    comentario = db.Column(db.Unicode)
    correo = db.Column(db.Unicode)

    # producto = relationship("imagen", "comprador", "vendedor")


@property
def serialize(self):
    return {
        'id' : self.id,
        'nombre': self.nombre,
        'descripcion': self.descripcion,
        'unidadesDisponibles': self.unidadesDisponibles,
        'comentario': self.comentario,
        'correo': self.correo
    }
