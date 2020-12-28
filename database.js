const { Sequelize } = require('sequelize');

module.exports = new Sequelize('mysqldb', 'admin53', '123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  define: {
    timestamps: false,
  },
});
