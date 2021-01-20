const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

module.exports = {
  getUser(where, include) {
    const queryData = { where };
    if (include) {
      queryData.include = include;
    }
    return models.User.findOne(queryData);
  },

  hashedPasswordService(password, count) {
    return bcrypt.hash(password, count);
  },

  createUserService(userEmail, hashedPassword) {
    return models.User.create({ email: userEmail, password: hashedPassword });
  },

  createStorageService(newStorage, newAddressStorage, userId) {
    return models.Storage.create({ name: newStorage, address: newAddressStorage, userId });
  },

  getStorages(where) {
    return models.Storage.findAll({ where });
  },

  async getStoragesData(where) {
    const storages = await this.getStorages(where);

    const userStorages = [];
    const userAddressesStorages = [];

    storages.forEach(({ name, address }) => {
      userStorages.push(name);
      userAddressesStorages.push(address);
    });

    return { userStorages, userAddressesStorages };
  },

  deleteDelivery(where) {
    return models.Delivery.destroy({ where });
  },

  deleteStorage(where) {
    return models.Storage.destroy({ where });
  },

  matchPassword(password, existPassword) {
    bcrypt.compare(password, existPassword);
  },

  getToken(userId) {
    return jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '1h' });
  },
};
