"""Forms for playlist app."""

from wtforms import SelectField, StringField, SubmitField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""
    name = StringField('Playlist Name', validators=[DataRequired(), Length(max=50)])
    genre = SelectField('Playlsit Genre', validators=[DataRequired()], choices=[('rock', 'Rock'), ('pop', 'Pop'), ('hiphop', 'Hip Hop'), ('jazz', 'Jazz')])
    


class SongForm(FlaskForm):
    """Form for adding songs."""
    title = StringField('Song Title', validators=[DataRequired()])
    artist = StringField('Artist Name', validators=[DataRequired()])
    submit = SubmitField('Add Song')


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
