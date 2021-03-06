'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deliveries', {
      id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      address: { type: Sequelize.STRING, allowNull: false },
      date: { type: Sequelize.STRING, allowNull: false },
      load: { type: Sequelize.STRING, allowNull: true },
      timeDelivery: { type: Sequelize.STRING, allowNull: true },
      description: { type: Sequelize.STRING, allowNull: true },
      storageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'Storages' }, key: 'id' },
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Deliveries');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
