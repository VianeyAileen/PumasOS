from datetime import timedelta
from flask import Flask, render_template, redirect, request, session
from flask_mail import Mail
from flask_cors import CORS, cross_origin
from flask_session import Session

app = Flask(__name__)

# La sesión tendrpa un límite de tiempo predeterminado, el cual caducará

app.secret_key = "secret_key"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10)
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

CORS(app)
