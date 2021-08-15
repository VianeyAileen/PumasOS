from flask import Flask
from flask_mail import Mail
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
