module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('tipos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'tipo',
    		plural: 'tipos'
        }
	})
