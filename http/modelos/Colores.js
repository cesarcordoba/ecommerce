module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('colores', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        hex: Sequelize.STRING,
        status: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'color',
    		plural: 'colores'
        }
	})
