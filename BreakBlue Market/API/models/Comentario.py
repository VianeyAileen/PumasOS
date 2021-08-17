from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class Comentario(db.Model):
    __tablename__ = 'comentario'

    id = db.Column(db.Integer, primary_key=True)
    comentario = db.Column()

@property
def serialize(self):
    return {
        'id': self.id, 
        'comentario': self.comentario
    }