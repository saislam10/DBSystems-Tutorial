const mysql = require('mysql');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // replace with the user you created
    password: 'Weekends121002!+', // replace with the password you set
    database: 'demo_db'
});

db.connect((error) => {
    if (error) throw error;
    console.log('Connected to the database!');
});

module.exports = db;
