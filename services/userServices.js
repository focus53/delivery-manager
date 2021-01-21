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

  getStorages(where, include) {
    const query = { where };
    if (include) {
      query.include = include;
    }
    return models.Storage.findAll(query);
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
    return bcrypt.compare(password, existPassword);
  },

  getToken(userId) {
    return jwt.sign({ userId }, config.get('jwtSecret'), { expiresIn: '1h' });
  },

  getDeliveries(storageId) {
    return models.Delivery.findAll({
      where: { storageId },
    }).then((dates) => dates.map((dateEl) => dateEl.date));
  },

  createDelivery(address, date, timeDelivery, load, description, existStorages) {
    return models.Delivery.create({
      address,
      date,
      timeDelivery,
      load,
      description,
      storageId: existStorages[0].id,
    });
  },
};
