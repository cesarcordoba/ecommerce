module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('facturas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'factura',
    		plural: 'facturas'
        }
	})
