const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');

const { sequelize } = require('./models');  
const app = express();
const PORT = 3001;
const cors = require('cors');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password', error: err.message });
        }

        sequelize.models.User.create({ username, password: hashedPassword })
            .then(user => {
                console.log("Stored password:", user.dataValues.password);
                res.status(201).json({ message: 'User registered successfully', userId: user.id });
            })

            .catch(err => {
                console.error("Error registering user:", err);
                res.status(500).json({ message: 'Error registering user', error: err.message });
            });
    });
    console.log("Entered password:", req.body.password);
    console.log("Stored password:", User.password);

});


app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        console.log("Retrieved user:", user); 
        console.log("Stored password:", user.dataValues.password);
        if (user.dataValues.password === req.body.password) {
            console.log("Direct comparison matches");
        } else {
            console.log("Direct comparison does NOT match");
        }
        
        if (!user) {
            console.log("User not found:", req.body.username);
            return res.status(400).send('Invalid credentials');
        }

        bcrypt.compare(req.body.password, user.dataValues.password, (err, result) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ message: 'Error comparing password', error: err.message });
            }
            if (result) {
                console.log("Passwords match for user:", req.body.username);
                res.status(200).send('Login successful');
            } else {
                console.log("Incorrect password for user:", req.body.username);
                res.status(400).send('Invalid credentials');
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
    console.log("Entered password:", req.body.password);


});


// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });
