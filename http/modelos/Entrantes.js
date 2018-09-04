module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('entrantes', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
		cantidad: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'entrante',
    		plural: 'entrantes'
        }
	})
