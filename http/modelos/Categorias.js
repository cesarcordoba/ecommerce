module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('categorias', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
		nivel: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'categoria',
    		plural: 'categorias'
        }
	})
