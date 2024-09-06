const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = 3000;


const db = mysql.createConnection({
    host: 'localhost',
    user: 'Owaish',
    password: '@Owaish31',
    database: 'students_db' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to database');
});


app.use(cors()); 
app.use(express.static('public')); 
app.use(bodyParser.json()); 


app.post('/submit', (req, res) => {
    const { name, contact, qualification } = req.body;

    const query = 'INSERT INTO Students (name, contact, qualification) VALUES (?, ?, ?)';
    db.query(query, [name, contact, qualification], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Data inserted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
