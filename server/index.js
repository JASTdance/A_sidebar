require('newrelic');
const express  = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const db = require('../database/index.js');

const PORT = 3131;

var app = express();

app.use(bodyparser());

app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));

app.get('/related_tracks/random', (req, res) => {
    var text = 'SELECT * FROM related_tracks INNER JOIN song_info ON song_info.song_id = related_tracks.related_song_id WHERE related_tracks.song_id=$1'
    var randomNum = Math.ceil(Math.random() * Math.floor(10000000))
    var values = [randomNum];
    db.query(text, values)
    .then(data => res.send(data.rows))
    .catch(err => console.log(err))
})

app.get('/related_tracks/:id', (req, res) => {
    var text = 'SELECT * FROM related_tracks INNER JOIN song_info ON song_info.song_id = related_tracks.related_song_id WHERE related_tracks.song_id=$1'
    var values = [req.params.id];
    db.query(text, values)
    .then(data => res.send(data.rows))
    .catch(err => console.log(err))
})

app.put('/related_tracks/:id', (req, res) => {
    var text = 'UPDATE related_tracks SET related_song_id=$1 WHERE song_id=$2 AND related_song_id=$3;';
    var values = [req.body.new_id, req.params.id, req.body.related_song_id];
    db.query(text, values)
    .then(data => res.send(`The relation between song_id: ${req.params.id} and ${req.body.related_song_id} has been updated to ${req.body.new_id}`))
    .catch(err => console.log(err))
})

app.post('/related_tracks/:id', (req, res) => {
    var text = 'INSERT INTO related_tracks (song_id, related_song_id) VALUES ($1, $2);';
    var values = [req.params.id, req.body.related_song_id];
    db.query(text, values)
    .then(data => res.send(`The relation between song_id: ${req.params.id} and ${req.body.related_song_id} has been added`))
    .catch(err => console.log(err))
})

app.delete('/related_tracks/:id', (req, res) => {
    var text = 'DELETE FROM related_tracks where song_id=$1 AND related_song_id=$2;';
    var values = [req.params.id, req.body.related_song_id];
    db.query(text, values)
    .then(data => res.send(`The relation between song_id: ${req.params.id} and ${req.body.related_song_id} has been deleted`))
    .catch(err => console.log(err))
})

app.put('/songinfo/followers/:id', (req, res) => {
    var text = 'UPDATE song_info SET artist_followers=$1 WHERE song_id=$2;';
    var values = [req.body.artist_followers, req.params.id];
    db.query(text, values)
    .then(data => res.send(`Artist followers is now: ${req.body.artist_followers}`))
    .catch(err => console.log(err))
})

app.put('/songinfo/likes/:id', (req, res) => {
    var text = 'UPDATE song_info SET likes=$1 WHERE song_id=$2;';
    var values = [req.body.likes, req.params.id];
    db.query(text, values)
    .then(data => res.send(`Song ${req.params.id} likes is now: ${req.body.likes}`))
    .catch(err => console.log(err))
})

app.put('/songinfo/reposts/:id', (req, res) => {
    var text = 'UPDATE song_info SET reposts=$1 WHERE song_id=$2;';
    var values = [req.body.reposts, req.params.id];
    db.query(text, values)
    .then(data => res.send(`Reposts for song ${req.params.id} is now: ${req.body.reposts}`))
    .catch(err => console.log(err))
})

app.listen(PORT, () => console.log('Express server started on ', PORT));