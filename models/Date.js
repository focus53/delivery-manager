const { Schema, model, Types } = require('mongoose');

<<<<<<< HEAD
const schema = new Schema({
  date: { type: String, required: true, unique: true },
  addresses: { type: Array, required: true },
});
=======
// const schema = new Schema({
//   date: { type: String, required: true, unique: true },
//   // storages: { type: Object, required: true },
//   // ADK: { type: Array, required: true },
//   // JAC: { type: Array, required: true },
//   // VER: { type: Array, required: true },
// });

<<<<<<< HEAD
const schema = new Schema({ date: { type: String, required: true, unique: false } }, { strict: false });
>>>>>>> 38823f1... refactor: Database + server router
=======
const schema = new Schema(
  {
    date: { type: String, required: true, unique: false },
    owner: { type: Types.ObjectId, required: true, ref: 'User' },
  },
  { strict: false }
);
>>>>>>> c3ddac2... add: Handel User response in seever

module.exports = model('Dates', schema);
