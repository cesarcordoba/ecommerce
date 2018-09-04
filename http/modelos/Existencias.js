module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('existencias', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad: Sequelize.INTEGER,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'existencia',
    		plural: 'existencias'
        }
	})
