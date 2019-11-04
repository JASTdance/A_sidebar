CREATE TABLE song_info( song_id int PRIMARY KEY, title varchar, times_played int, reposts int, comments int, likes int, song_picture_url varchar, related_tracks varchar, artist_id int, artist_name varchar, artist_followers int, artist_picture_url varchar);

COPY related_tracks.song_info (song_id, title, times_played, reposts, comments, likes, song_picture_url, related_tracks, artist_id, artist_name, artist_followers, artist_picture_url) FROM '/home/acrav/soundclout-sidebar-module/ten-million-cassandra.csv' WITH DELIMITER='|';


INSERT INTO related_tracks.song_info(song_id, title, times_played, reposts, comments, likes, song_picture_url, related_tracks, artist_id, artist_name, artist_followers, artist_picture_url) VALUES (1, 'This is a new Song', 1, 10, 10, 100, 'www.songPicture.com', '[track1, track2, track3]', 5, 'New Artist', 5, 'www.artistPicture.com');