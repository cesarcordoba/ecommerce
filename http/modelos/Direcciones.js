module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('direcciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'direccion',
    		plural: 'direcciones'
        }
	})
