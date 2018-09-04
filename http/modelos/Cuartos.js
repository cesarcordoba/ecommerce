module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('cuartos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'cuarto',
    		plural: 'cuartos'
        }
	})
