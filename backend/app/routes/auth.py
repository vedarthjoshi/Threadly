from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import User
from app import db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    hashed_pw = generate_password_hash(data["password"])

    user = User(username=data["username"], email=data["email"], password=hashed_pw)
    db.session.add(user)

    try:
        db.session.commit()
        return jsonify(message="User Registered Successfully"), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify(error="User already exists"), 409

@auth_bp.route("/login", methods=["POST"])

def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify(error="Invalid credentials"), 401
    
    token = create_access_token(identity=str(user.id))
    return jsonify(token=token), 200
