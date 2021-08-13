from app import app
from flask_mail import Mail

mail = Mail()

#Mail configurations
app.config['MAIL_SERVER'] = 'smtp@gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'dicteraulad@gmail.com'
app.config['MAIL_PASSWORD'] =  'Dicter2605.'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail.init_app(app)
