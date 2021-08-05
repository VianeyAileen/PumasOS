from app import app
from flaskext.mysql import MySQL

mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
<<<<<<< HEAD
=======
app.config['MYSQL_DATABASE_PASSWORD'] = 'bluedolph'
app.config['MYSQL_DATABASE_DB'] = 'BreakBlueMarket'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

# # Enable debug mode.
# DEBUG = True

# # Connect to the database
# SQLALCHEMY_DATABASE_URI = 'mysql+pymysql:://root:bluedolph@localhost/BreakBlueMarket'

# # Turn off the Flask-SQLAlchemy event system and warning
# SQLALCHEMY_TRACK_MODIFICATIONS = False

>>>>>>> ddc56064f7920acf61d58f70b12bda63f483e2e5
