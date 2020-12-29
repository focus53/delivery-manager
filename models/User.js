const { Sequelize, Model } = require('sequelize');

class User extends Model {}

module.exports = (sequelize, dataTypes) => {
  User.init(
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'User', // We need to choose the model name
      timestamps: false,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Storage, { as: 'ownStorages', foreignKey: 'userId' });
  };

  return User;
};
