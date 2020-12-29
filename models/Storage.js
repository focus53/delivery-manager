const { Sequelize, Model } = require('sequelize');

class Storage extends Model {}

module.exports = (sequelize, dataTypes) => {
  Storage.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: false },
      userId: { type: Sequelize.INTEGER, references: { model: { tableName: 'users' }, key: 'id' } },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Storage', // We need to choose the model name
      timestamps: false,
    }
  );

  Storage.associate = function (models) {
    Storage.belongsTo(models.User, { as: 'ownUser', foreignKey: 'id' });
    Storage.hasMany(models.Delivery, { as: 'ownDeliveries', foreignKey: 'storageId' });
  };

  return Storage;
};
