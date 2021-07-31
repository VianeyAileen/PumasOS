from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class Genero(db.Model):
    __tablename__ = 'genero'

    correo = db.Column(db.Unicode, primary_key=True, unique=True)
    genero = db.Column(db.Unicode)

@property
def serialize(self):
    return {
        'correo': self.correo, 
        'genero': self.genero
    }