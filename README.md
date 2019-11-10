# Sidebar-module

To implement the semi-static/dynamic sidebar and playlist component for the SoundClout web application.

## Related Projects

 - https://github.com/4-ever-young/soundclout-active-player-module.git
 - https://github.com/4-ever-young/soundclout-info-comments-module.git
 - https://github.com/4-ever-young/soundclout-active-display-module

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
  k6 run script.js
```
### Production

  npm install
  npm run webpack -p

### Stress Testing

  npm start
  k6 run script.js