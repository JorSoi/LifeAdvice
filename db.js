const Pool = require('pg').Pool;
const pool = new Pool({
    host: "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
    database: "dtr9o3dddv34l",
    user: "jtwpkywwuyjelm",
    port: 5432,
    password: "f97d2ed2e146c8698957f1ea54e2fe90e82930e868683c2f5f697c9708886dc1"
})

module.exports = pool