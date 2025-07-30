# app/routes/comment_routes.py

from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from app import db
from app.models.comments import Comment
from app.models.thread import Thread
from app.models.user import User

comment_bp = Blueprint('comments', __name__, url_prefix='/api/comments')

# POST /api/comments - Create comment
@comment_bp.route('', methods=['POST'])
@jwt_required()
def create_comment():
    data = request.get_json()
    content   = data.get('content')
    thread_id = data.get('thread_id')

    # Derive author from JWT
    author_id = int(get_jwt_identity())

    if not content or not thread_id:
        return jsonify({"error": "Missing content or thread_id"}), 400

    comment = Comment(content=content, author_id=author_id, thread_id=thread_id)
    db.session.add(comment)
    db.session.commit()

    return jsonify({"id": comment.id, "message": "Comment created"}), 201

# GET /comments/thread/<thread_id> - Get comments for a thread
@comment_bp.route('/thread/<int:thread_id>', methods=['GET'])
def get_comments_for_thread(thread_id):
    comments = Comment.query.filter_by(thread_id=thread_id).all()
    return jsonify([
        {
            "id": c.id,
            "content": c.content,
            "author_id": c.author_id,
            "thread_id": c.thread_id,
            "created_at": c.created_at
        } for c in comments
    ])

# PUT /comments/<comment_id> - Update a comment
@comment_bp.route('/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    data = request.get_json()
    content = data.get('content')
    if not content:
        return jsonify({"error": "Content is required"}), 400

    comment.content = content
    db.session.commit()

    return jsonify({"message": "Comment updated"}), 200

# DELETE /comments/<comment_id> - Delete a comment
@comment_bp.route('/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({"error": "Comment not found"}), 404

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Comment deleted"}), 200
