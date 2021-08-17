from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class Imagen(db.Model):
    __tablename__ = 'imagen'

    id = db.Column(db.Integer)
    imagen = db.Column()

@property
def serialize(self):
    return {
        'id': self.id, 
        'imagen': self.imagen
    }