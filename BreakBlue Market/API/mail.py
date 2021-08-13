from app import app
from flask_mail import Mail

email = Mail()

#Mail configurations
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'dicter05@gmail.com'
app.config['MAIL_PASSWORD'] =  'Audi2608.'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

email.init_app(app)
