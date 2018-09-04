module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('inventarios', {
		id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        clave: Sequelize.STRING,
        cantidad: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'inventario',
    		plural: 'inventarios'
        }
	})
