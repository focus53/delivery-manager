const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

require('dotenv').config();
app.use(express.json({ extended: true }));
app.use('/api/date', require('./routes/date.router'));
app.use('/api/auth', require('./routes/auth.router'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connected...');
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));

start();
