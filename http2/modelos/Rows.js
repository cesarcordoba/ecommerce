module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('rows', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad: Sequelize.STRING,
    },{
    	name : {
    		singular: 'row',
    		plural: 'rows'
        }
	})
