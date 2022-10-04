const { query } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const pool = require('./db.js');
const cors = require('cors');



//Middleware
app.use(express.json());
app.use(cors());



//CRUD Routes
app.get('/', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM categories");
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


app.get('/lessons/category/:categoryName', async (req, res) => {
    //gets all lifelessons from the category listed as a request parameter 
});



app.post('/lessons/newlesson', async (req, res) => {
    //creates new lesson here
})





















app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})