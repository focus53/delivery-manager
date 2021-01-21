const models = require('../models');
const userServices = require('../services/userServices');

module.exports = {
  getDates: async (req, res) => {
    try {
      const storagesWithDelivery = await userServices.getStorages(
        { userId: req.user.userId },
        { model: models.Delivery, as: 'ownDeliveries' }
      );

      const storageId = storagesWithDelivery.map(({ id }) => id);

      const ownDates = await userServices.getDeliveries(storageId);

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
  },

  createDelivery: async (req, res) => {
    try {
      const { date, address, storage, userId, timeDelivery, load, description } = req.body;

      const existStorages = await userServices.getStorages({ userId, name: storage });

      const newDelivery = await userServices.createDelivery(
        address,
        date,
        timeDelivery,
        load,
        description,
        existStorages
      );

      res.status(201).json({ message: 'Created new address', newDelivery, storage });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },

  deleteDelivery: async (req, res) => {
    try {
      const { index, selectedDate, storage, storages } = req.body;

      await userServices.deleteDelivery({ id: index });

      res.status(204).json({ message: 'Date deleted' });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
