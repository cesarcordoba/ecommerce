var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('ferremar', 'root', '1234', {
     host: '127.0.0.1',
     dialect: 'mysql',
     port: '3306',
     operatorsAliases: true,
     pool: {
         max: 5,
         min: 0,
         idle: 200000,
         acquire: 200000
    }
 })
// var sequelize = new Sequelize('gigante', 'root', '1234', {
//     host: '127.0.0.1',
//     dialect: 'mysql',
//     port: '8889',
//     operatorsAliases: true,
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 200000,
//         acquire: 200000
//     }
// })

/*sequelize.sync()
    .then(() => console.log('Connecion realizada'))
    .catch(err => console.log('No se puede conectar a la bd:', err))
*/
module.exports = {sequelize, Sequelize}
