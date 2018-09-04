module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('fotos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'foto',
    		plural: 'fotos'
        }
	})
