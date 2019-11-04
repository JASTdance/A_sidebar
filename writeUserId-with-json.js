const fs = require('fs');


// function createFile() {
//   var stream = fs.createWriteStream('one-hundred-userId.json');
//   for (var i = 0; i < 100; i++) {
//     function trueFalse() {return Math.random() > .5 ? true : false;}
//     var name = ['Rahim', 'Lily', 'David', 'Aruna', 'Candy', 'Faith', 'Pri', 'Maia', 'Alex', 'Jeehyae', 'Selam', 'Thomas'];
//     var randomName = `${name[Math.floor(Math.random() * Math.floor(11))]}${i}`
//     var location = ['San Franscisco', 'Los Angeles', 'Seattle', 'Chicago', 'New York'];
//     var randomLoc = location[Math.floor(Math.random() * Math.floor(4))];
//     var randomPic = Math.floor(Math.random() * Math.floor(999));
//     var obj = {
//       username_id: i,
//       username: randomName,
//       followers: Math.floor(Math.random() * 1000) + 50,
//       user_picture_url: `/images/${randomPic}.jpg`,
//       user_location: randomLoc,
//       pro_account: trueFalse(),
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

function trueFalse() {return Math.random() > .5 ? true : false;}
var name = ['Rahim', 'Lily', 'David', 'Aruna', 'Candy', 'Faith', 'Pri', 'Maia', 'Alex', 'Jeehyae', 'Selam', 'Thomas'];
var location = ['San Franscisco', 'Los Angeles', 'Seattle', 'Chicago', 'New York'];

function writeOneMillionTimes(writer, callback) {
  console.log('start!')
  console.time();
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      var randomName = `${name[Math.floor(Math.random() * Math.floor(11))]}${i}`;
      var randomLoc = location[Math.floor(Math.random() * Math.floor(4))];
      var obj = {
        username_id: i,
        username: randomName,
        followers: Math.floor(Math.random() * 1000) + 50,
        user_picture_url: `https://picsum.photos/id/${Math.floor(Math.random() * Math.floor(1000))}/50/50`,
        user_location: randomLoc,
        pro_account: trueFalse(),
      }
      i++;
      if (i === 1000) {
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
    } while (i < 1000 && ok);
    if (i < 1000) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

var stream = fs.createWriteStream('one-thousand-userId.json');
stream.on('finish', () => {
  console.log("Stream Finished!")
  console.timeEnd()
});
stream.on('error', (err) => {
  console.log(err)
})

writeOneMillionTimes(stream);