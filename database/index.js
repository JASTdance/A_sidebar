const { Pool } = require('pg');
const reference = require('./reference.js');

const pool = new Pool({
  host: reference.host,
  user: reference.user,
  database: reference.database,
  password: reference.password,
  port: reference.port
});

pool.on('error', (err, client) => {
  console.log(err);
  process.exit(-1)
})

pool.connect()

module.exports = pool;