const { Sequelize, Model } = require('sequelize');

class Delivery extends Model {}

module.exports = (sequelize, dataTypes) => {
  Delivery.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      address: { type: Sequelize.STRING, allowNull: false },
      date: { type: Sequelize.STRING },
      storageId: { type: Sequelize.INTEGER, references: { model: { tableName: 'storages' }, key: 'id' } },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Delivery', // We need to choose the model name
      timestamps: false,
    }
  );
  Delivery.associate = function (models) {
    Delivery.belongsTo(models.Storage, { as: 'ownStorage', foreignKey: 'id' });
  };

  return Delivery;
};
