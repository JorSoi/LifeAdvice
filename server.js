const { query } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.port || 3000;
const pool = require('./db.js');


app.use(express.json());





app.get('/lessons/category/:categoryName', async (req, res) => {
    //gets all lifelessons from the category listed as a request parameter 
});

app.get('/', async (req, res) => {

})

app.post('/lessons/newlesson', async (req, res) => {
    //creates new lesson here
})





















app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})