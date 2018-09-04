module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('productos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'producto',
    		plural: 'productos'
        }
	})
