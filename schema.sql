DROP DATABASE IF EXISTS soundclout;

CREATE DATABASE soundclout;

USE soundclout;

CREATE TABLE username_info (
    username_id serial PRIMARY KEY,
    username VARCHAR(100),
    followers INT,
    user_picture_url VARCHAR(250),
    user_location VARCHAR(100),
    pro_account VARCHAR(5)
);

CREATE TABLE song_info (
    song_id serial PRIMARY KEY,
    title VARCHAR(100),
    username_id INT,
    times_played INT,
    reposts INT,
    comments INT,
    category VARCHAR(100),
    song_picture_url VARCHAR(250),
    CONSTRAINT fk_song_info_artist_info
    FOREIGN KEY (artist_id)
        REFERENCES username_info (username_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE song_likes (
    songlike_id serial PRIMARY KEY,
    song_id INT,
    username_id INT,
    CONSTRAINT fk_song_likes_username_info
    FOREIGN KEY (username_id)
        REFERENCES username_info (username_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_song_likes_song_info
    FOREIGN KEY (song_id)
        REFERENCES song_info (song_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


///// Alex

CREATE TABLE artist_info (
    artist_id serial PRIMARY KEY,
    artist_name VARCHAR(100),
    artist_followers INT,
    artist_picture_url VARCHAR(250)
);

COPY artist_info(artist_name, artist_followers, artist_picture_url) FROM '/home/acrav/soundclout-sidebar-module/ten-million-artist.csv' DELIMITER '|';

CREATE TABLE song_info(
    song_id serial PRIMARY KEY,
    title VARCHAR(100),
    times_played INT,
    reposts INT,
    comments INT,
    likes INT,
    song_picture_url VARCHAR(250),
    artist_id INT REFERENCES artist_info (artist_id),
    related_tracks VARCHAR(50)
);

COPY song_info(title, times_played, reposts, comments, likes, song_picture_url, artist_id, related_tracks) FROM '/home/acrav/soundclout-sidebar-module/ten-million-songs.csv' DELIMITER '|';


EXPLAIN ANALYZE SELECT * FROM song_info INNER JOIN artist_info ON artist_info.artist_id = song_info.artist_id WHERE song_info.artist_id = 1 ;

INSERT INTO song_info (song_id, title, times_played, reposts, comments, likes, song_picture_url, artist_id, related_tracks) VALUES (10000001, $$newSong$$, 100, 12, 132, 1023, $$www.songPicture.com$$, 237068, $$[56, 9994376, 2352139]$$);

SELECT * FROM song_info ORDER BY song_id DESC limit 10;

UPDATE song_info SET title = $$Rahim$$, times_played = 5000, reposts = 7733, likes = 4732 WHERE song_id=1;

DELETE FROM song_info where song_id=10000005;

UPDATE
   song_info
SET
   related_tracks = REPLACE (
     related_tracks,
   '_',
   $$, $$
   );