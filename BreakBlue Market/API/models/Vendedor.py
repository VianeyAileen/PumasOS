from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class Vendedor(db.Model):
    __tablename__ = 'vendedor'

    correo = db.Column(db.Unicode, primary_key=True, unique=True)
    nombre = db.Column(db.Unicode)
    apellidos =db.Column(db.Unicode)
    contrasena =db.Column(db.Unicode)
    nombreUsuario =db.Column(db.Unicode)
    genero =db.Column(db.Unicode)
    edad =db.Column(db.Unicode)

@property
def serialize(self):
    return {
        'correo': self.correo,
        'nombre': self.nombre,
        'apellidos': self.apellidos,
        'contrasena': self.contrasena,
        'nombreUsuario': self.nombreUsuario,
        'genero': self.genero,
        'edad': self.edad
    }
