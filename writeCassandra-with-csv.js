const fs = require('fs');

var name = ['Rahim', 'Lily', 'David', 'Aruna', 'Candy', 'Faith', 'Pri', 'Maia', 'Alex', 'Jeehyae', 'Selam', 'Thomas'];

var titleArr = [
  'Rahim the Dream', 'Lily the Beautiful Flower', 'David the Beast', 'Aruna the Positive', 'Peeja the Main Man','Candy the Chocolate', 'Faith the Faithful', 'Pri the Sweet', 'Jennie the Stern', 'Maia the Knowledgable'];

function writeOneMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      var randomTitle = `${titleArr[Math.floor(Math.random() * Math.floor(9))]}${i}`;
      var randomName = `${name[Math.floor(Math.random() * Math.floor(11))]}${i}`;
      var randomTrack1 = Math.floor(Math.random() * Math.floor(9999999));
      var randomTrack2 = Math.floor(Math.random() * Math.floor(9999999));
      var randomTrack3 = Math.floor(Math.random() * Math.floor(9999999));
      var obj = {
        song_id: i,
        title: randomTitle,
        times_played: Math.floor(Math.random() * 9899) + 100,
        reposts: Math.floor(Math.random() * 9899) + 100,
        comments: Math.floor(Math.random() * 9999),
        likes: Math.floor(Math.random() * 100000),
        song_picture_url: `https://picsum.photos/id/${Math.floor(Math.random() * Math.floor(1000))}/70/70`,
        related_tracks: `[${randomTrack1}, ${randomTrack2}, ${randomTrack3}]`,
        artist_id: Math.floor(Math.random() * Math.floor(9999999)),
        artist_name: randomName,
        artist_followers: Math.floor(Math.random() * 10000) + 50,
        artist_picture_url: `https://picsum.photos/id/${Math.floor(Math.random() * Math.floor(1000))}/70/70`
      }
      i++;
      if (i === 10000000) {
        // Last time!
        var lastString = `${obj.song_id}|${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.related_tracks}|${obj.artist_id}|${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}`;
        writer.write(lastString)
      } else if (i === 1) {
        // first time!
        var firstString = `${obj.song_id}|${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.related_tracks}|${obj.artist_id}|${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}\n`;
        writer.write(firstString);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        var stringObj = `${obj.song_id}|${obj.title}|${obj.times_played}|${obj.reposts}|${obj.comments}|${obj.likes}|${obj.song_picture_url}|${obj.related_tracks}|${obj.artist_id}|${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}\n`;
        ok = writer.write(stringObj);
      }
    } while (i < 10000000 && ok);
    if (i < 10000000) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

var stream = fs.createWriteStream('one-thousand-cassandra.csv');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
});

writeOneMillionTimes(stream);
