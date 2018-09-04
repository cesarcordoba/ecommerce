module.exports = ({Sequelize, sequelize} = conector) =>
    sequelize.define('ambientes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'ambiente',
    		plural: 'ambientes'
        }
	})
