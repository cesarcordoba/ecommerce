var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('respaldos', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: true,
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        acquire: 20000
    }
});
//
// sequelize.sync()
//     .then(() => console.log('Segunda connecion realizada'))
//     .catch(err => console.log('No se puede conectar a la bd:', err))

module.exports = {sequelize, Sequelize}
