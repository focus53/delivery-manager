const { Router } = require('express');
const Dates = require('../models/Date');
const router = Router();
const authMiddleware = require('../middleware/authMiddleware');

// /api

router.get('/', authMiddleware, async (req, res) => {
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
    const { date, address, storage, userId } = req.body;

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

    const newDate = await new Dates({ date, [storage]: [address], owner: userId });
    await newDate.save();
    res.status(201).json({ date, address });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/delete_address', async (req, res) => {
  try {
    const { index, selectedDate, storage, storages } = req.body;

    const existDate = await Dates.findOne({ date: selectedDate });

    if (existDate) {
      let toObjDate = existDate.toObject();
      toObjDate[storage].splice(index, 1);

      let existingStorages = Object.keys(toObjDate).filter((element) =>
        storages.some((el) => el === element) ? true : false
      );

      if (existingStorages.every((element) => toObjDate[element].length === 0)) {
        await Dates.deleteOne({ date: selectedDate });
        return res.status(200).json({ message: 'Date deleted' });
      }

      await Dates.updateOne({ date: selectedDate }, { $set: { [storage]: toObjDate[storage] } });
      return res.status(200).json({ message: 'Address deleted' });
    }

    res.status(400).json({ message: 'Date not found' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
