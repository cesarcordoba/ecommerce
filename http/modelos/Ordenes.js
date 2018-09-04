module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('ordenes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        idTransaccionOpenpay: Sequelize.STRING,
    },{
    	name : {
    		singular: 'orden',
    		plural: 'ordenes'
        }
	})
