from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Producto(db.Model):
    __tablename__='producto'

    id = db.Column(db.Integer, primary_key=True, unique=True)
    nombre = db.Column(db.Unicode)
    precio = db.Column(db.Unicode)
    marca = db.Column(db.Unicode)
    descripcion = db.Column(db.Unicode)
    unidadesDisponibles = db.Column(db.Integer)
    correo = db.Column(db.Unicode)
    imagen = db.Column(db.Unicode)



@property
def serialize(self):
    return {
        'id' : self.id,
        'nombre': self.nombre,
        'precio' : self.precio,
        'descripcion': self.descripcion,
        'unidadesDisponibles': self.unidadesDisponibles,
        'comentario': self.comentario,
        'correo': self.correo,
<<<<<<< HEAD
        'imagen':self.imagen
=======
        'imagen': self.imagen
>>>>>>> Jose
    }
