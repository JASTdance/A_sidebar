CREATE DATABASE soundclout;

USE soundclout;

CREATE TABLE song_info(
    song_id serial PRIMARY KEY,
    title VARCHAR(100),
    times_played INT,
    reposts INT,
    comments INT,
    likes INT,
    song_picture_url VARCHAR(250),
    artist_name VARCHAR(100),
    artist_followers INT,
    artist_picture_url VARCHAR(250)
);


CREATE TABLE related_tracks(
    id serial PRIMARY KEY,
    song_id INT,
    related_song_id INT REFERENCES song_info (song_id)
);

COPY related_tracks(song_id, related_song_id) FROM '/home/acrav/soundclout-sidebar-module/ten-million-related.csv' DELIMITER '|';


COPY song_info(title, times_played, reposts, comments, likes, song_picture_url, artist_name, artist_followers, artist_picture_url) FROM '/home/acrav/soundclout-sidebar-module/ten-million-songs.csv' DELIMITER '|';
