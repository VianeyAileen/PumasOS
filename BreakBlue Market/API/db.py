from app import app
from flaskext.mysql import MySQL

mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
<<<<<<< HEAD
app.config['MYSQL_DATABASE_PASSWORD'] = ''
=======
app.config['MYSQL_DATABASE_PASSWORD'] = '123456789'
>>>>>>> 3fcf3335b5e40a780ce965cdadf8051eb4c03aeb
app.config['MYSQL_DATABASE_DB'] = 'BreakBlueMarket'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)
