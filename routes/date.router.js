const { Router } = require('express');
const DateItem = require('../models/Date');
const router = Router();

// /api
router.delete('/date', async (req, res) => {
  try {
    const { date, mapsUrl } = req.body;
    console.log(req.body);
    // const day = new DateItem({ date: date, mapsUrl: mapsUrl });
    // day.save();
    //const matchDay = await DateItem.find({ date: date });

    const deleteDay = await DateItem.deleteOne({ date: 'date 456' });

    res.status(204).json(deleteDay);
  } catch (e) {
    res.status(500).json({ message: 'Something is wrong!' });
  }
});

module.exports = router;
