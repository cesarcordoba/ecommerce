module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('gamas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'gama',
    		plural: 'gamas'
        }
	})
