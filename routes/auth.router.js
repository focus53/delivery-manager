const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/authMiddleware');

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

    res.status(200).json({ userId: user.id, token, userStorages: user.storages });
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

router.post('/storage', async (req, res) => {
  const { userId, newStorage } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User is undefined' });
    }

    user.storages.push(newStorage);
    user.save();
    res.status(201).json({ message: 'Created' });
  } catch (e) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

router.get('/storage', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    res.status(400).json({ message: 'User is undefined' });
  }
  const user = await User.findById(userId);
  res.status(200).json({ userStorages: user.storages });
});

module.exports = router;
