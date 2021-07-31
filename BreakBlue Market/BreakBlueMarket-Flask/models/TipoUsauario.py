from flask_sqlamchemy import SQLAlchemy

db = SQLAlchemy()

class TipoUsuario(db.Model):
    __tablename__ = 'tipoUsuario'

    correo = db.Column(db.Unicode, primary_key=True, unique=True)
    tipoUsuario = db.Column(db.Unicode)

@property
def serialize(self):
    return {
        'correo': self.correo, 
        'tipoUsuario': self.tipoUsuario
    }