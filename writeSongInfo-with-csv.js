const fs = require('fs');

var titleArr = [
  'Rahim the Dream', 'Lily the Beautiful Flower', 'David the Beast', 'Aruna the Positive', 'Peeja the Main Man','Candy the Chocolate', 'Faith the Faithful', 'Pri the Sweet', 'Jennie the Stern', 'Maia the Knowledgable']

function writeTenMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 1;
  write();
  function write() {
    let ok = true;
    do {
    var randomTitle = `${titleArr[Math.floor(Math.random() * Math.floor(9))]}${i}`;
    var randomTrack1 = Math.ceil(Math.random() * Math.floor(10000000));
    var randomTrack2 = Math.ceil(Math.random() * Math.floor(10000000));
    var randomTrack3 = Math.ceil(Math.random() * Math.floor(10000000));
    var obj = {
      title: randomTitle,
      times_played: Math.floor(Math.random() * 9899) + 100,
      reposts: Math.floor(Math.random() * 9899) + 100,
      comments: Math.floor(Math.random() * 9999),
      song_picture_url: `https://picsum.photos/id/${Math.floor(Math.random() * Math.floor(1000))}/50/50`,
      artist_id: Math.ceil(Math.random() * Math.floor(1000000)),
      likes: Math.floor(Math.random() * 100000),
      related_tracks: `[${randomTrack1}, ${randomTrack2}, ${randomTrack3}]`,
    }
      i++;
      if (i === 10000001) {
        // Last time!
        var lastString = `${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.artist_id}|${obj.related_tracks}`;
        writer.write(lastString);
        writer.end();
      } else if (i === 1) {
        // first time!
        var firstString = `${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.artist_id}|${obj.related_tracks}\n`;
        writer.write(firstString);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        var stringObj = `${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.artist_id}|${obj.related_tracks}\n`;
        ok = writer.write(stringObj);
      }
    } while (i < 10000001  && ok);
    if (i < 10000001) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

var stream = fs.createWriteStream('ten-million-songs.csv');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeTenMillionTimes(stream);