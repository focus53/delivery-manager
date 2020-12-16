const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTION') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message });
    }

    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong' });
  }
};

module.exports = authMiddleware;
