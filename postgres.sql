CREATE DATABASE soundwave;

\c soundwave;

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
    related_song_id INT
);
