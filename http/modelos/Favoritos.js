module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('favoritos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'favorito',
    		plural: 'favoritos'
        }
	})
