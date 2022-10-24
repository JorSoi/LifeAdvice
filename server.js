const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');



//Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('tiny'));



//CRUD Routes

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.get('/categories', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM categories ORDER BY id;");
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/lessons', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM lessons;")
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log(err);
    }
}); 

app.get('/lessons/:lesson_id', async (req, res) => {
    const db_res = await pool.query("SELECT * FROM lessons WHERE id = $1;", [req.params.lesson_id]);
    res.status(200).send(db_res.rows); 
})

app.put('/lessons/upvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET upvotes = upvotes + 1 WHERE id = $1;", [req.params.lesson_id]);
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



app.post('/lesson/create', async (req, res) => {
        console.log(req.body)
    try {
        await pool.query("INSERT INTO lessons VALUES(DEFAULT, $1, $2, $3, 0, 0)", [req.body.category_id, req.body.lesson, req.body.author], (error, result) => {
            if(!error) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
        });
        

    } catch (err) {
        console.log(err);
    }
})




















app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})
