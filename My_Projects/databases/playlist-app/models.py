"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""
    __tablename__ = 'playlist'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50))
    songs = db.relationship('Song', backref='playlist')


class Song(db.Model):
    """Song."""
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100),nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer) # in seconds
    playlist_id = db.Column(b.Integer, db.ForeignKey('Playlist.id'))
    playlist = db.realationship('Playlist', backref='songs')
    


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    # Code should be sufficiently backrefed in the previous models


# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
