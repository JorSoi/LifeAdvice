require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);



 
//Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('tiny'));
app.use(session({
    store: new pgSession({
        pool: pool
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5 //5 minutes
    }
}))  


//CRUD Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.get('/categories', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT * FROM categories ORDER BY id;");
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log('database query fucked up for categories' + err);
        res.sendStatus(500);
    } 
});

app.get('/lessons', async (req, res) => {
    try {
        const db_res = await pool.query("SELECT lessons.*, categories.category_emoji FROM lessons JOIN categories ON lessons.category_id = categories.id;")
        res.status(200).send(db_res.rows);
    } catch (err) {
        console.log('database query didnt work for lessons' + err);
    }
}); 

app.get('/lessons/:lesson_id', async (req, res) => {
    const db_res = await pool.query("SELECT lessons.*, categories.category_emoji FROM lessons JOIN categories ON lessons.category_id = categories.id WHERE lessons.id = $1;", [req.params.lesson_id]);
    res.status(200).send(db_res.rows); 
})

app.put('/lessons/upvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET upvotes = upvotes + 1 WHERE lessons.id = $1;", [req.params.lesson_id]);
    const db_res = await pool.query("SELECT id, upvotes FROM lessons WHERE lessons.id = $1;", [req.params.lesson_id]);
    if(req.session.upvoteMemory) {
        req.session.upvoteMemory.push(db_res.rows[0].id)
    } else {
        req.session.upvoteMemory = [];
        req.session.upvoteMemory.push(db_res.rows[0].id)
    }
    res.send(db_res.rows);
})

app.put('/lessons/downvote/:lesson_id', async (req, res) => {
    const db_updt = await pool.query("UPDATE lessons SET downvotes = downvotes + 1 WHERE id = $1", [req.params.lesson_id]);
    const db_res = await pool.query("SELECT id, downvotes FROM lessons WHERE id = $1", [req.params.lesson_id]);
    if(req.session.downvoteMemory) {
        req.session.downvoteMemory.push(db_res.rows[0].id)
    } else {
        req.session.downvoteMemory = [];
        req.session.downvoteMemory.push(db_res.rows[0].id)
    }
    res.send(db_res.rows);
})


app.get('/lessons/category/:categoryId', async (req, res) => {
    const db_res = await pool.query("SELECT lessons.*, categories.category_emoji FROM lessons JOIN categories ON lessons.category_id = categories.id WHERE category_id = $1", [req.params.categoryId]);
    res.status(200).send(db_res.rows); 
});



app.post('/lesson/create', async (req, res) => {
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

app.get('/session', (req, res) => {
    if(req.session) {
        res.send(req.session);
    } else {
        res.sendStatus(404);
    }
})



















app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})