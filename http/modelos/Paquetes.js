module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('paquetes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'paquete',
    		plural: 'paquetes'
        }
	})
