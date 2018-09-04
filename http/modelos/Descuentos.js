module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('descuentos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        cantidad: Sequelize.INTEGER,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'descuento',
    		plural: 'descuentos'
        }
	})
