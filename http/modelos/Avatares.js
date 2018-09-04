module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('avatares', {
    	fb_avatar: Sequelize.STRING,
        tw_avatar: Sequelize.STRING,
        gg_avatar: Sequelize.STRING,
        insta_avatar: Sequelize.STRING,
    },{
    	name : {
    		singular: 'avatar',
    		plural: 'avatares'
        }
	})
