module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('opciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'opcion',
    		plural: 'opciones'
        }
	})
