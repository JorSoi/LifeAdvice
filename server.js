const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const pool = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');



//Middleware
app.use(bodyParser.json());
app.use(cors());



//CRUD Routes
app.get('/categories', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM categories");
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/lessons', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM lessons")
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log(err);
    }
});

app.put('/lessons/upvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET upvotes = upvotes + 1 WHERE id = $1", [req.params.lesson_id]);
    const db_res = await pool.query("SELECT upvotes FROM lessons WHERE id = $1", [req.params.lesson_id]);
    res.send(db_res.rows);
    
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