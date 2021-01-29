const jwt = require('jsonwebtoken');
const config = require('config');

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTION') {
    return next();
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token doesn't exist :(" });
    }
    req.user = jwt.verify(token.split(' ')[1], config.get('jwtSecret'));

    next();
  } catch (e) {
    res.status(401).json({ message: 'Incorrect token' });
  }
};

module.exports = authMiddleware;
