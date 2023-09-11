const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const db = require('./database.js');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Sorting by cost in ascending order
app.get('/items/sortedByCost', (req, res) => {
    const sql = 'SELECT * FROM items ORDER BY cost ASC';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json(results);
    });
});

// Reverse sorting by cost in descending order
app.get('/items/reverseSortedByCost', (req, res) => {
    const sql = 'SELECT * FROM items ORDER BY cost DESC';
    db.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error' });
        }
        return res.json(results);
    });
});

app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
