from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.thread import Thread
from .. import db

thread_bp = Blueprint('thread_bp', __name__, url_prefix='/api/threads')

@thread_bp.route('/', methods=['POST'])
@jwt_required()
def create_thread():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    user_id = int(get_jwt_identity())  # cast to int

    if not title or not content:
        return jsonify({"error": "Title and content are required"}), 400

    thread = Thread(title=title, content=content, author_id=user_id)
    db.session.add(thread)
    db.session.commit()

    return jsonify({"message": "Thread created", "id": thread.id}), 201

@thread_bp.route('', methods=['GET'])
def get_all_threads():
    threads = Thread.query.all()
    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "content": t.content,
            "created_at": t.created_at,
            "author_id": t.author_id,
        } for t in threads
    ])

@thread_bp.route('/<int:id>', methods=['GET'])
def get_thread(id):
    thread = Thread.query.get_or_404(id)
    return jsonify({
        "id": thread.id,
        "title": thread.title,
        "content": thread.content,
        "created_at": thread.created_at,
        "author_id": thread.author_id,
    })

@thread_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_thread(id):
    user_id = int(get_jwt_identity())  # cast to int
    thread = Thread.query.get_or_404(id)

    if thread.author_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if title:
        thread.title = title
    if content:
        thread.content = content

    db.session.commit()
    return jsonify({"message": "Thread updated", "id": thread.id}), 200

@thread_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_thread(id):
    user_id = int(get_jwt_identity())  # cast to int
    thread = Thread.query.get_or_404(id)

    if thread.author_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403

    db.session.delete(thread)
    db.session.commit()
    return jsonify({"message": "Thread deleted", "id": id}), 200
