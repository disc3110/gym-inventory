const { Pool } = require("pg");

const user = process.env.DB_USER;  // This should be read from an environment variable
const password = process.env.DB_PASSWORD;  // This should be read from an environment variable
const host = process.env.DB_HOST;  // This should be read from an environment variable
const database = process.env.DB_NAME;
const port = process.env.DB_PORT || 5432;

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}`
});
