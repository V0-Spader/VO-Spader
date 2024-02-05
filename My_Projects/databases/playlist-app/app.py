from flask import Flask, redirect, render_template, request, flash, url_for, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Playlist, Song, PlaylistSong
from forms import NewSongForPlaylistForm, SongForm, PlaylistForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///playlist-app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)


@app.route("/")
def root():
    """Homepage: redirect to /playlists."""

    return redirect("/playlists")


##############################################################################
# Playlist routes


@app.route("/playlists")
def show_all_playlists():
    """Return a list of playlists."""

    playlists = Playlist.query.all()
    return render_template("playlists.html", playlists=playlists)


@app.route("/playlists/<int:playlist_id>", methods=['GET'])
def show_playlist(playlist_id):
    """Show detail on specific playlist."""

    #query the database for the playlsit by id
    playlist = db.session.query(Playlist).filter_by(id=playlist_id).first()

    if playlist: #if playlist exists
        return render_template('playlist.html', playlist=playlist)
    else: #if the playlist doesn't exist
        return 'Playlist not found', 404 # return 404 error


@app.route("/playlists/add", methods=["GET", "POST"])
def add_playlist():
    """Handle add-playlist form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-playlists
    """
    form = PlaylistForm()
    if form.validate_on_submit():
        # do somwthing with the form data, such as adding a new playlsit to the database
        return redirect('/')
    return render_template('new_playlist.html', form=form)
    


##############################################################################
# Song routes


@app.route("/songs")
def show_all_songs():
    """Show list of songs."""

    songs = Song.query.all()
    return render_template("songs.html", songs=songs)


@app.route("/songs/<int:song_id>", method=['GET'])
def show_song(song_id):
    """return a specific song"""

    song = db.session.query(Song).filter_by(id=song_id).first()

    if song: 
        return jsonify(id=song.id, title=song.title, artist=song.artist, duration=song.duration)
    else:
        return 'Song not found', 404


@app.route("/songs/add", methods=["GET", "POST"])
def add_song():
    """Handle add-song form:

    - if form not filled out or invalid: show form
    - if valid: add playlist to SQLA and redirect to list-of-songs
    """
    form = SongForm()
    if request.method == 'POST' and form.validate():
        new_song = Song(titel=form.title.data, artist=form.artist.data)
        db.session.add(new_song)
        db.session.commit()
        flash('Song added successfully')
        return redirect(url_for('/'))
    return render_template('songs.html', form=form)

   


@app.route("/playlists/<int:playlist_id>/add-song", methods=["GET", "POST"])
def add_song_to_playlist(playlist_id):
    """Add a playlist and redirect to list."""

    # BONUS - ADD THE NECESSARY CODE HERE FOR THIS ROUTE TO WORK

    # THE SOLUTION TO THIS IS IN A HINT IN THE ASSESSMENT INSTRUCTIONS

    playlist = Playlist.query.get_or_404(playlist_id)
    form = NewSongForPlaylistForm()

    # Restrict form to songs not already on this playlist

    curr_on_playlist = ...
    form.song.choices = ...

    if form.validate_on_submit():

          # ADD THE NECESSARY CODE HERE FOR THIS ROUTE TO WORK

          return redirect(f"/playlists/{playlist_id}")

    return render_template("add_song_to_playlist.html",
                             playlist=playlist,
                             form=form)
