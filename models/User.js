const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  storages: { type: Array },
  storagesAddresses: { type: Array },
});

module.exports = model('User', schema);
