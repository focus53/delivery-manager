const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const db = require('./models');

app.use(express.json({ extended: true }));

app.use('/api/date', require('./routes/delivery.router'));
app.use('/api/user', require('./routes/user.router'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

db.sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((error) => console.log(error));
