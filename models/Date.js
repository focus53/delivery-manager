const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  date: { type: String, required: true, unique: true },
  mapsUrl: { type: String, required: true },
});

module.exports = model('DateItem', schema);
