module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('sucursales', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        clave :{ type: Sequelize.INTEGER },
        nombre: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'sucursal',
    		plural: 'sucursales'
        }
	})
