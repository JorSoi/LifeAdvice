require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});


const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false,
    }
})

module.exports = pool;