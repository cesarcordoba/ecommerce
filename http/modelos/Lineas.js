module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('lineas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'linea',
    		plural: 'lineas'
        }
	})
