module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('usuarios', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        password: Sequelize.STRING
    },{
    	name : {
    		singular: 'usuario',
    		plural: 'usuarios'
        }
	})
