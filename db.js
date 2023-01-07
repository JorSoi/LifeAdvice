require('dotenv').config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`
});



const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'containers-us-west-96.railway.app',
    database: 'railway',
    user: 'postgres',
    port: 7832,
    password: 'v3UGnWiJ1p0okLZVPCor',
    // ssl: {
    //     rejectUnauthorized: false //In production SSL Encryption is deactivated to access remote database
    // }
})


module.exports = pool;