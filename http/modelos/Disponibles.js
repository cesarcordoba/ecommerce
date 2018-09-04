module.exports = ({Sequelize, sequelize} = conector) =>
    sequelize.define('disponibles', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        oferta: Sequelize.INTEGER,
        descuento: Sequelize.INTEGER
    },{
    	name : {
    		singular: 'disponible',
    		plural: 'disponibles'
        }
	})
