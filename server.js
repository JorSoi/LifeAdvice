const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const pool = require('./db.js');


app.use(express.json());





























app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})