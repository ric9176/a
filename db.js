const { Pool } = require('pg');

const stringToBool = (i) => {
  if(i === 'false') return false;
  if(i === 'true') return true;
  return undefined
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: stringToBool(process.env.DATABASE_SSL)
});

const executeQuery = query => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res.rows);
    });
  });
};

module.exports = {
  executeQuery,
};