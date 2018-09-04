module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('atributos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'atributo',
    		plural: 'atributos'
        }
	})
