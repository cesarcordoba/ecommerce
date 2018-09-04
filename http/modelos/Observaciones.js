module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('observaciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        contenido: Sequelize.TEXT
    },{
    	name : {
    		singular: 'observacion',
    		plural: 'observaciones'
        }
	})
