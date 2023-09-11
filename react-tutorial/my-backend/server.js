const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(express.json());
app.use(cors());

app.get('/initDb', (req, res) => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)', [], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ message: 'Table created!' });
  });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    return res.json({ message: 'User registered!', id: this.lastID });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row || password !== row.password) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: row.id }, '123456', { expiresIn: '1h' });
    return res.json({ message: 'Login successful!', token });
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
