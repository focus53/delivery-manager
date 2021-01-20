const models = require('../models');
const userServices = require('../services/userServices');

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { userEmail, password } = req.body;
      const isExistUser = await userServices.getUser({ email: userEmail });
      if (isExistUser) {
        return res.status(400).json({ message: 'User is already exist' });
      }
      const hashedPassword = await userServices.hashedPasswordService(password, 12);
      await userServices.createUserService(userEmail, hashedPassword);
      res.status(201).json({ message: 'User is created' });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },

  addStorage: async (req, res) => {
    const { userId, newStorage, newAddressStorage } = req.body;
    try {
      await userServices.createStorageService(newStorage, newAddressStorage, userId);
      res.status(201).json({ message: 'Created' });
    } catch (e) {
      res.status(500).json({ message: 'Something wrong' });
    }
  },

  getStoragesData: async (req, res) => {
    const userId = req.user.userId;

    if (!userId) {
      res.status(400).json({ message: 'User is undefined' });
    }
    const userStoragesData = await userServices.getStoragesData({ userId });
    res.status(200).json(userStoragesData);
  },

  deleteStorage: async (req, res) => {
    try {
      const { storageName, userId } = req.body;

      const storages = await userServices.getStorages({ userId });
      const storageToDelete = storages.find((storage) => storage.dataValues.name === storageName);

      await userServices.deleteDelivery({ storageId: storageToDelete.dataValues.id });

      await userServices.deleteStorage({ id: storageToDelete.dataValues.id });

      res.status(201).json({ message: 'Storage deleted', storageToDelete });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
  userLogin: async (req, res) => {
    try {
      const { userEmail, password } = req.body;

      /*const existUser = await models.User.findOne({
        where: { email: userEmail },
        include: [{ model: models.Storage, as: 'ownStorages' }],
      });*/

      const existUser = await userServices.getUser({ email: userEmail }, [
        { model: models.Storage, as: 'ownStorages' },
      ]);

      if (!existUser) {
        return res.status(400).json({ message: 'Incorrect email or password!' });
      }

      const matchPassword = await userServices.matchPassword(password, existUser.password);

      if (!matchPassword) {
        return res.status(400).json({ message: 'Incorrect email or password!' });
      }

      const token = userServices.getToken(existUser.id);

      const { userStorages, userAddressesStorages } = userServices.getStoragesData({ userId: existUser.id });

      /*const userStorages = existUser.ownStorages.map((stor) => stor.name);
      const userAddressesStorages = existUser.ownStorages.map((stor) => stor.address);*/

      res.status(200).json({ userId: existUser.id, token, userStorages, userAddressesStorages, userEmail });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
