module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('statuses', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'status',
    		plural: 'statuses'
        }
	})
