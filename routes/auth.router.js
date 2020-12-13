const { Router } = require('express');
const User = require('../models/User');
const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const user = await User.findOne({ email: userEmail });
    if (user) {
      return res.status(200).json({ user });
    }

    res.status(400).json({ message: 'User not found!' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
