const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/login', async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }
    const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), { expiresIn: '1h' });

    res.status(200).json({ userId: user.id, token });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const isExistUser = await User.findOne({ email: userEmail });

    if (isExistUser) {
      return res.status(400).json({ message: 'User is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({ email: userEmail, password: hashedPassword });
    newUser.save();

    res.status(201).json({ message: 'User is created' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
