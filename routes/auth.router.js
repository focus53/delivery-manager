const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const authMiddleware = require('../middleware/authMiddleware');
const models = require('../models');

const router = Router();

// api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { userEmail, password } = req.body;

    const existUser = await models.User.findOne({
      where: { email: userEmail },
      include: [{ model: models.Storage, as: 'ownStorages' }],
    });

    if (!existUser) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }

    const matchPassword = await bcrypt.compare(password, existUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: 'Incorrect email or password!' });
    }

    const token = jwt.sign({ userId: existUser.id }, config.get('jwtSecret'), { expiresIn: '1h' });

    const userStorages = existUser.ownStorages.map((stor) => stor.name);
    const userAddressesStorages = existUser.ownStorages.map((stor) => stor.address);

    res.status(200).json({ userId: existUser.id, token, userStorages, userAddressesStorages });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const isExistUser = await models.User.findOne({ where: { email: userEmail } });

    if (isExistUser) {
      return res.status(400).json({ message: 'User is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await models.User.create({ email: userEmail, password: hashedPassword });

    res.status(201).json({ message: 'User is created' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// api/auth/storage
router.post('/storage', async (req, res) => {
  const { userId, newStorage, newAddressStorage } = req.body;

  try {
    await models.Storage.create({ name: newStorage, address: newAddressStorage, userId });
    res.status(201).json({ message: 'Created' });
  } catch (e) {
    res.status(500).json({ message: 'Something wrong' });
  }
});

// api/auth/storage
router.get('/storage', authMiddleware, async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    res.status(400).json({ message: 'User is undefined' });
  }

  const user = await models.User.findOne({
    where: { id: userId },
    include: { model: models.Storage, as: 'ownStorages' },
  });

  const userStorages = user.ownStorages.map((stor) => stor.name);
  const userAddressesStorages = user.ownStorages.map((stor) => stor.address);

  res.status(200).json({ userStorages, userAddressesStorages });
});

module.exports = router;
