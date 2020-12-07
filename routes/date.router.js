const { Router } = require('express');
const Dates = require('../models/Date');
const router = Router();

// /api

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
  try {
    const date = await Dates.find({});

    res.status(200).json({ date });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/date', async (req, res) => {
  try {
<<<<<<< HEAD
    const { date, address } = req.body;

=======
    const { date, address, storage } = req.body;
>>>>>>> 4406587... refactor: update reducer + links
    let isExistDate = await Dates.findOne({ date });
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
    const newDate = await new Dates({ date, [storage]: [address] });
<<<<<<< HEAD

<<<<<<< HEAD
    const newDate = new Dates({ date, addresses: address });
=======
>>>>>>> 38823f1... refactor: Database + server router
=======
>>>>>>> 4406587... refactor: update reducer + links
    await newDate.save();
    res.status(201).json({ date, address });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/date/delete_address', async (req, res) => {
  try {
    const { index, selectedDate } = req.body;
    console.log(index);

    const existDate = await Dates.findOne({ date: selectedDate });

    if (existDate) {
      if (existDate.addresses.length <= 1) {
        await Dates.deleteOne({ date: selectedDate });

        return res.status(200).json({ message: 'Date deleted' });
      }
      await existDate.addresses.splice(index, 1);
      await existDate.save();
      return res.status(200).json({ message: 'Address deleted' });
    }

    res.status(400).json({ message: 'Date not found' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
