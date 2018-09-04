module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('portadas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        // imagen: {
        //     type: Sequelize.BLOB('medium'),
        //     allowNull: false,
        //     get() {
        //         if(this.getDataValue('imagen'))
        //             return new Buffer(this.getDataValue('imagen')).toString('ascii')
        //         else
        //             return null
        //     }
        // },
        link: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },{
    	name : {
    		singular: 'portada',
    		plural: 'portadas'
        }
	})
