// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       username: req.body.username,
//       password: hashedPassword
//     });
//     res.status(201).json({ userId: user.id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ where: { username: req.body.username } });
//   if (!user || !await bcrypt.compare(req.body.password, user.password)) {
//     return res.status(401).json({ error: 'Incorrect username or password' });
//   }
//   const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
//   res.json({ token });
// });

// module.exports = router;
