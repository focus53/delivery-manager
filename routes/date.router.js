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
    const { date, address } = req.body;

    const isExistDate = await Dates.findOne({ date });

    if (isExistDate) {
      isExistDate.addresses.push(address);
      await isExistDate.save();
      return res.status(201).json({ date, address });
    }

    const newDate = new Dates({ date, addresses: address });
    await newDate.save();
    res.status(201).json({ date, address });
  } catch (e) {
    res.status(500).json('Something is wrong');
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
