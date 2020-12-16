const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const matchPassword = user.password === password;

    if (!matchPassword) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    console.log(userEmail);
    const isExistUser = await User.findOne({ email: userEmail });

    if (isExistUser) {
      return res.status(400).json({ message: 'User is already exist' });
    }

    const newUser = await new User({ email: userEmail, password });
    newUser.save();

    res.status(201).json({ message: 'User is created' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
