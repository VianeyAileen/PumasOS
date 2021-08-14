from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class Calificacion(db.Model):
    __tablename__ = 'Calificacion'

    id = db.Column(db.Integer, primary_key=True)
    Calificacion = db.Column()

@property
def serialize(self):
    return {
        'id': self.id, 
        'Calificacion': self.Calificacion
    }