const fs = require('fs');

function writeTenMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 1;
  write();
  function write() {
    let ok = true;
    do {
    var obj = {
      song_id: i,
      related_id: Math.ceil(Math.random() * 10000000)
    }
      i++;
      if (i === 10000001) {
        // Last time!
        var lastString = `${obj.song_id}|${obj.related_id}\n${obj.song_id}|${Math.ceil(Math.random() * 10000000)}\n${obj.song_id}|${Math.ceil(Math.random() * 10000000)}\n`;
        writer.write(lastString);
        writer.end();
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        var stringObj = `${obj.song_id}|${obj.related_id}\n${obj.song_id}|${Math.ceil(Math.random() * 10000000)}\n${obj.song_id}|${Math.ceil(Math.random() * 10000000)}\n`;
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

var stream = fs.createWriteStream('ten-million-related.csv');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeTenMillionTimes(stream);