const fs = require('fs');

// var titleArr = [
//   'Rahim the Dream', 'Lily the Beautiful Flower', 'David the Beast', 'Aruna the Positive', 'Peeja the Main Man','Candy the Chocolate', 'Faith the Faithful', 'Pri the Sweet', 'Jennie the Stern', 'Maia the Knowledgable']

// var cat = ['Hip-Hop', 'Classic Rock','Alternative','Indie Rock','Rock and Roll','R&B']

// function createFile() {
//   var stream = fs.createWriteStream('one-Hundred-SongInfo.json');
//   for (var i = 0; i < 100; i++) {
//     var randomTitle = `${titleArr[Math.floor(Math.random() * Math.floor(9))]}${i}`;
//     var randomCat = `${cat[Math.floor(Math.random() * Math.floor(5))]}`;
//     var randomPic = Math.floor(Math.random() * Math.floor(999));
//     var obj = {
//       song_id: i,
//       title: randomTitle,
//       username_id: i,
//       times_played: Math.floor(Math.random() * 9899) + 100,
//       reposts: Math.floor(Math.random() * 9899) + 100,
//       comments: Math.floor(Math.random() * 9999),
//       category: randomCat,
//       song_picture_url: `/images/${randomPic}.jpeg`
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

var titleArr = [
  'Rahim the Dream', 'Lily the Beautiful Flower', 'David the Beast', 'Aruna the Positive', 'Peeja the Main Man','Candy the Chocolate', 'Faith the Faithful', 'Pri the Sweet', 'Jennie the Stern', 'Maia the Knowledgable']

var cat = ['Hip-Hop', 'Classic Rock','Alternative','Indie Rock','Rock and Roll','R&B']


function writeOneMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
    var randomTitle = `${titleArr[Math.floor(Math.random() * Math.floor(9))]}${i}`;
    var randomCat = `${cat[Math.floor(Math.random() * Math.floor(5))]}`;
    var randomPic = Math.floor(Math.random() * Math.floor(999));
    var obj = {
      song_id: i,
      title: randomTitle,
      username_id: i,
      times_played: Math.floor(Math.random() * 9899) + 100,
      reposts: Math.floor(Math.random() * 9899) + 100,
      comments: Math.floor(Math.random() * 9999),
      category: randomCat,
      song_picture_url: `/images/${randomPic}.jpeg`
    }
      i++;
      if (i === 10000000) {
        // Last time!
        var lastString = JSON.stringify(obj) + ']';
        writer.write(lastString);
        writer.end();
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
    } while (i < 10000000  && ok);
    if (i < 10000000) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

var stream = fs.createWriteStream('ten-million-songs.json');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeOneMillionTimes(stream);