module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('bases', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        clave :{ type: Sequelize.INTEGER },
        nombre: Sequelize.STRING,
        url: Sequelize.STRING
    },{
    	name : {
    		singular: 'base',
    		plural: 'bases'
        }
	})
