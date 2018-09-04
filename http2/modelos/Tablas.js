module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('tablas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        url: Sequelize.STRING
    },{
    	name : {
    		singular: 'tabla',
    		plural: 'tablas'
        }
	})
