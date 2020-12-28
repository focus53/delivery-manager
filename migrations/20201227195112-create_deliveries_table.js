'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      id: { type: Sequelize.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      address: { type: Sequelize.STRING, allowNull: false },
      date: { type: Sequelize.STRING, allowNull: false },
      storageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: { tableName: 'storages' }, key: 'id' },
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
    return queryInterface.dropTable('deliveries');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
