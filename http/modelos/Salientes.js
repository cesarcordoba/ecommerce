module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('salientes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'saliente',
    		plural: 'salientes'
        }
	})
