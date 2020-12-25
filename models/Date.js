const { Schema, model, Types } = require('mongoose');

// const schema = new Schema({
//   date: { type: String, required: true, unique: true },
//   // storages: { type: Object, required: true },
//   // ADK: { type: Array, required: true },
//   // JAC: { type: Array, required: true },
//   // VER: { type: Array, required: true },
// });

const schema = new Schema(
  {
    date: { type: String, required: true, unique: false },
    owner: { type: Types.ObjectId, required: true, ref: 'User' },
  },
  { strict: false }
);

module.exports = model('Dates', schema);
