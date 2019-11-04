const fs = require('fs');

var name = ['Rahim', 'Lily', 'David', 'Aruna', 'Candy', 'Faith', 'Pri', 'Maia', 'Alex', 'Jeehyae', 'Selam', 'Thomas'];

function writeTenMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 1;
  write();
  function write() {
    let ok = true;
    do {
      var randomName = `${name[Math.floor(Math.random() * Math.floor(11))]}${i}`;
      var obj = {
        artist_name: randomName,
        artist_followers: Math.floor(Math.random() * 10000) + 50,
        artist_picture_url: `https://picsum.photos/id/${Math.floor(Math.random() * Math.floor(1000))}/50/50`
      }
      i++;
      if (i === 10000001) {
        // Last time!
        var lastString = `${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}`;
        writer.write(lastString);
        writer.end();
      } else if (i === 1) {
        // first time!
        var firstString = `${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}\n`;
        writer.write(firstString);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        var stringObj = `${obj.artist_name}|${obj.artist_followers}|${obj.artist_picture_url}\n`;
        ok = writer.write(stringObj);
      }
    } while (i < 10000001 && ok);
    if (i < 10000001) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

var stream = fs.createWriteStream('ten-million-artist.csv');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeTenMillionTimes(stream);