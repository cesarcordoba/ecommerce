module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('transacciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'transaccion',
    		plural: 'transacciones'
        }
	})
