module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('precios', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad: Sequelize.INTEGER,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'precio',
    		plural: 'precios'
        }
	})
