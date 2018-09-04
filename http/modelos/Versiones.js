module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('versiones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        linea: Sequelize.STRING,
        precio: Sequelize.INTEGER,
        existencia: Sequelize.INTEGER,
		status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'version',
    		plural: 'versiones'
        }
	})
