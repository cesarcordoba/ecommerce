module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('ofertas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}
    },{
    	name : {
    		singular: 'oferta',
    		plural: 'ofertas'
        }
	})
