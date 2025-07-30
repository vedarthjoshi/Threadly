from app import db
from datetime import datetime

class Thread(db.Model):
    __tablename__ = 'threads'  # explicit plural name

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    # Now SQLAlchemy can auto-detect the join condition
    author = db.relationship('User', backref='threads')
