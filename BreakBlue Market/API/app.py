from flask import Flask, render_template, redirect, request, session
from flask_cors import CORS, cross_origin
from flas_session import Session

app = Flask(__name__)

# La sesión tendrpa un límite de tiempo predeterminado, el cual caducará
# 
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

CORS(app)

