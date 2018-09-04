module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('promos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'promo',
    		plural: 'promos'
        }
	})
