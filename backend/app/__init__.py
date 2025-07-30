from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app():

    load_dotenv()

    app = Flask(__name__)   
    app.config.from_object('config.Config')

    # EXTENSIONS SETUP
    db.init_app(app)
    jwt.init_app(app)    

    CORS(app=app) # WHEN WE USE REACT WE NEED THIS (BASICALLY TO CONNECT DIFFRENT DOMAIN)

    # REGISTER ROUTES
    from .routes import register_blueprints
    from app.routes.thread_routes import thread_bp
    # app.register_blueprint(thread_bp, url_prefix="/api/threads")
    register_blueprints(app)
    

    return app



