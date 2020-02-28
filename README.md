# Related Tracks Module

JASTdance is a streaming music service with song display, active player, related tracks, and song comments modules.
This module is the related tracks component.

### Usage

 - display images/information for tracks in the album
 - display images/information for tracks in playlist
 - display images of account profiles that like the playlist, with a pop-up that includes their information
 - display profiles that have reposted the song
 - site map

### Requirements

 - Node 8.15.0
 - Nvm 6.4.1
 - etc.

### Development
```
  npm install
  npm run webpack -p
  npm start
```
### To Seed Database
  - Navigate to postgres database in the terminal
  - Use the DataGen scripts to create the data for Postgres
       - node writeRelated.js (to create csv for related_tracks table)
       - node writeSong.js (to create csv for song_info table)
  - Use the provided postgres.sql to create the database and tables for Postgres
  - Use the scripts to import the data from the newly created Data files into Postgres
       - COPY related_tracks(song_id, related_song_id) FROM '/home/acrav/soundclout-sidebar-module/ten-million-related.csv' DELIMITER '|';
       - COPY song_info(title, times_played, reposts, comments, likes, song_picture_url, artist_name, artist_followers, artist_picture_url) FROM '/home/acrav/soundclout-sidebar-module/ten-million-songs.csv' DELIMITER '|';

  ** Note the directory after FROM should be the directory where the DataGen files were stored followed by '/ten-million-songs.csv' DELIMITER '|';

### Production
```
  npm install
  npm run production
  npm start (to run node server)
```

### Stress Testing

  npm start
  k6 run script.js