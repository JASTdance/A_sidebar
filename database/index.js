const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'soundclout',
  password: 'acrav',
  port: 5432
});

pool.on('error', (err, client) => {
  console.log(err);
  process.exit(-1)
})

pool.connect()

module.exports = pool;