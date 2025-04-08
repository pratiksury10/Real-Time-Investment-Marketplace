const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;



// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const router = express.Router();

// // Register User
// router.post('/register', async (req, res) => {
//   const { username, email, password, role } = req.body;

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   const newUser = new User({ username, email, password: hashedPassword, role });

//   try {
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Login User
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) return res.status(400).json('Invalid credentials');

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).json('Invalid credentials');

//     const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;
