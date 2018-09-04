module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('posiciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        y: Sequelize.INTEGER,
        x: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'posicion',
    		plural: 'posiciones'
        }
	})
