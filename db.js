require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    port: process.env.PG_PORT,
    password: process.env.PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = pool;