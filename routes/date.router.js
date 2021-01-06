const { Router } = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const models = require('../models');

const router = Router();

// /api/date/
router.get('/', authMiddleware, async (req, res) => {
  try {
    const storagesWithDelivery = await models.Storage.findAll({
      where: { userId: req.user.userId },
      include: { model: models.Delivery, as: 'ownDeliveries' },
    });

    const storageId = storagesWithDelivery.map((storageEl) => storageEl.id);

    const ownDates = await models.Delivery.findAll({
      where: { storageId },
    }).then((dates) => dates.map((dateEl) => dateEl.date));

    let ownDatesFiltered = [];

    ownDates.forEach((dateEl) => {
      const isExist = ownDatesFiltered.find((el) => el === dateEl);
      if (!isExist) {
        ownDatesFiltered.push(dateEl);
      }
    });

    const date = ownDatesFiltered.map((dateEl) => {
      let resultData = { date: dateEl };

      storagesWithDelivery.forEach((storEl) => {
        resultData[storEl.name] = storEl.ownDeliveries.filter((delEl) => {
          return delEl.date === dateEl;
        });
      });
      return resultData;
    });

    res.status(200).json({ date });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// /api/date
router.post('/create_address', async (req, res) => {
  try {
    const { date, address, storage, userId, timeDelivery, load, description } = req.body;

    const existStorage = await models.Storage.findOne({
      where: { userId, name: storage },
    });

    const newDelivery = await models.Delivery.create({
      address,
      date,
      timeDelivery,
      load,
      description,
      storageId: existStorage.id,
    });

    res.status(201).json({ message: 'Created new address', newDelivery, storage });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// /api/date/delete_address
router.post('/delete_address', async (req, res) => {
  try {
    const { index, selectedDate, storage, storages } = req.body;

    await models.Delivery.destroy({ where: { id: index } });

    res.status(204).json({ message: 'Date deleted' });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// /api/date/asd
router.get('/asd', async (req, res) => {
  try {
    const response = await models.Storage.findAll({
      where: { id: 1 },
      include: { model: models.User, as: 'ownUser' },
    });

    res.status(200).json({ response });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
