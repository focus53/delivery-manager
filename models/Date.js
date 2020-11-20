const { Schema, model } = require('mongoose');

const schema = new Schema({
  date: { type: String, required: true, unique: true },
  addresses: { type: Array, required: true },
});

module.exports = model('Dates', schema);
