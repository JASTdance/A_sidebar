var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'student',
    database: 'soundclout'
})

connection.connect( (err) => {
    if (err) {
        console.log('DATABASE IS NOT CONNECTED: ', err);
        return;
    }
    console.log('database is connected')
});




module.exports = connection;