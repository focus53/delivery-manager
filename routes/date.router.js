const { Router } = require('express');
const Dates = require('../models/Date');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');

// /api

<<<<<<< HEAD
<<<<<<< HEAD
// router.get('/date/:date', async (req, res) => {
//   try {
//     console.log(req.params);
//     const date = await Dates.findOne({ date: req.params.date });
//     res.status(200).json({ date });
//   } catch (e) {
//     res.status(500).json(e.message);
//   }
// });

router.get('/date', async (req, res) => {
=======
router.get('/', async (req, res) => {
>>>>>>> c3ddac2... add: Handel User response in seever
=======
router.get('/', authMiddleware, async (req, res) => {
>>>>>>> 46666bc... refactor: API with token
  try {
    const date = await Dates.find({ owner: req.user.userId });

    res.status(200).json({ date });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/:date', async (req, res) => {
  try {
    const date = await Dates.find({ date: req.params.date });
    res.status(200).json({ date: date[0] });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
<<<<<<< HEAD
<<<<<<< HEAD
    const { date, address } = req.body;

=======
    const { date, address, storage } = req.body;
>>>>>>> 4406587... refactor: update reducer + links
    let isExistDate = await Dates.findOne({ date });
=======
    const { date, address, storage, userId } = req.body;
<<<<<<< HEAD
    let isExistDate = await Dates.findOne({ owner: userId });
>>>>>>> 1a7d319... add: Register with token
    if (isExistDate) {
<<<<<<< HEAD
      isExistDate.addresses.push(address);
      await isExistDate.save();
      return res.status(201).json({ date, address });
=======
      let toObj = isExistDate.toObject();
      if (toObj[storage]) {
        toObj[storage].push(address);
        await Dates.updateOne({ date }, { $set: { [storage]: toObj[storage] } });
        return res.status(201).json({ date, address, storage });
      }
      await Dates.updateOne({ date }, { $set: { [storage]: [address] } });
      return res.status(201).json({ date, address, storage });
>>>>>>> 38823f1... refactor: Database + server router
    }
<<<<<<< HEAD
<<<<<<< HEAD
    const newDate = await new Dates({ date, [storage]: [address] });
<<<<<<< HEAD

<<<<<<< HEAD
    const newDate = new Dates({ date, addresses: address });
=======
>>>>>>> 38823f1... refactor: Database + server router
=======
>>>>>>> 4406587... refactor: update reducer + links
=======
    const newDate = await new Dates({ date, [storage]: [address], owner: '5fd60367dc797e3a3cb76ee4' });
>>>>>>> c3ddac2... add: Handel User response in seever
=======
=======

    let isExistDate = await Dates.find({ owner: userId });

    if (isExistDate) {
      const isMatchDate = isExistDate.find((el) => {
        return el.date === date;
      });
      if (isMatchDate) {
        let toObj = isMatchDate.toObject();
        if (toObj[storage]) {
          toObj[storage].push(address);
          await Dates.updateOne({ date }, { $set: { [storage]: toObj[storage] } });
          return res.status(201).json({ date, address, storage });
        }
        await Dates.updateOne({ date }, { $set: { [storage]: [address] } });
        return res.status(201).json({ date, address, storage });
      }
    }

>>>>>>> 46666bc... refactor: API with token
    const newDate = await new Dates({ date, [storage]: [address], owner: userId });
>>>>>>> 1a7d319... add: Register with token
    await newDate.save();
    res.status(201).json({ date, address });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/delete_address', async (req, res) => {
  try {
<<<<<<< HEAD
    const { index, selectedDate } = req.body;
    console.log(index);
=======
    const { index, selectedDate, storage, storages } = req.body;
>>>>>>> c27eb70... refactor: Delete

    const existDate = await Dates.findOne({ date: selectedDate });

    if (existDate) {
<<<<<<< HEAD
      if (existDate.addresses.length <= 1) {
=======
      let toObjDate = existDate.toObject();
      toObjDate[storage].splice(index, 1);

      let existingStorages = Object.keys(toObjDate).filter((element) =>
        storages.some((el) => el === element) ? true : false
      );

      if (existingStorages.every((element) => toObjDate[element].length === 0)) {
>>>>>>> c27eb70... refactor: Delete
        await Dates.deleteOne({ date: selectedDate });

        return res.status(200).json({ message: 'Date deleted' });
      }
<<<<<<< HEAD
      await existDate.addresses.splice(index, 1);
      await existDate.save();
=======

      await Dates.updateOne({ date: selectedDate }, { $set: { [storage]: toObjDate[storage] } });
>>>>>>> c27eb70... refactor: Delete
      return res.status(200).json({ message: 'Address deleted' });
    }

    res.status(400).json({ message: 'Date not found' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
