module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('tarjetas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'tarjeta',
    		plural: 'tarjetas'
        }
	})
