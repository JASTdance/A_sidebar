const fs = require('fs');

// function createFile() {
//   var stream = fs.createWriteStream('one-hundred-likes.json');
//   for (var i = 0; i < 100; i++) {
//     var obj = {
//       songlike_id: i,
//       song_id: i,
//       username_id: i
//     }
//     if (i === 0) {
//       var firstString = '[' + JSON.stringify(obj) + ',\n';
//       stream.write(firstString)
//     }
//     else if (i === 99) {
//       var lastString = JSON.stringify(obj) + ']';
//       stream.write(lastString)
//     } else {
//       var stringObj = JSON.stringify(obj) + ',\n'
//       stream.write(stringObj)
//     }
//   }
//   stream.on('close', () => {
//     console.log('All done!');
//   });
// }

// createFile();

function writeOneMillionTimes(writer, callback) {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      var obj = {
        songlike_id: i,
        song_id: i,
        username_id: i
      }
      i++;
      if (i === 10000000) {
        // Last time!
        var lastString = JSON.stringify(obj) + ']';
        writer.write(lastString)
      } else if (i === 1) {
        // first time!
        var firstString = '[' + JSON.stringify(obj) + ',\n';
        writer.write(firstString);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        var stringObj = JSON.stringify(obj) + ',\n'
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

var stream = fs.createWriteStream('ten-million-likes.json');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeOneMillionTimes(stream);
