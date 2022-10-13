const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const pool = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');



//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));



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

app.get('/lessons/:lesson_id', async (req, res) => {
    const db_res = await pool.query("SELECT * FROM lessons WHERE id = $1", [req.params.lesson_id]);
    res.status(200).send(db_res.rows); 
})

app.put('/lessons/upvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET upvotes = upvotes + 1 WHERE id = $1", [req.params.lesson_id]);
    const db_res = await pool.query("SELECT id, upvotes FROM lessons WHERE id = $1", [req.params.lesson_id]);
    res.send(db_res.rows);
})

app.put('/lessons/downvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET downvotes = downvotes + 1 WHERE id = $1", [req.params.lesson_id]);
    const db_res = await pool.query("SELECT id, downvotes FROM lessons WHERE id = $1", [req.params.lesson_id]);
    res.send(db_res.rows);
    
})


app.get('/lessons/category/:categoryId', async (req, res) => {
    const db_res = await pool.query("SELECT * FROM lessons WHERE category_id = $1", [req.params.categoryId]);
    res.status(200).send(db_res.rows); 
});



app.post('/lessons/newlesson', async (req, res) => {
    //creates new lesson here
})





















app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})