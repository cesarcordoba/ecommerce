module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('marcas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        razon: Sequelize.STRING,
        clave: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'marca',
    		plural: 'marcas'
        }
	})
