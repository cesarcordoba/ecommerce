module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('sets', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'set',
    		plural: 'sets'
        }
	})
