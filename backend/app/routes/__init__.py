from .auth import auth_bp
from .thread_routes import thread_bp  # <-- Import this
from .comment_routes import comment_bp

def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(thread_bp)  # <-- Register this (thread_bp already has its own /api/threads prefix)
    app.register_blueprint(comment_bp)