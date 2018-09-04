var express = require('express');
var routeUsuario = express.Router();

var x = require("../controladores/Usuarios");

routeUsuario.route('/data/usuario')
        .get(x.read)
        .post(x.create);

routeUsuario.route('/data/usuario/avatar/:id')
        .get(x.avatar);

routeUsuario.route('/data/registro/')
        .post(x.registro);

routeUsuario.route('/data/login')
        .post(x.login);

routeUsuario.route('/data/token/:token')
        .get(x.token);

routeUsuario.route('/login/facebook')
        .get(x.facebook);

routeUsuario.route('/login/twitter')
        .get(x.twitter)

routeUsuario.route('/login/instagram')
        .get(x.instagram)     

routeUsuario.route('/login/google')
        .get(x.google)  

routeUsuario.route('/login/facebook/callback')
        .get(x.facebookcallback);

routeUsuario.route('/login/twitter/callback')
        .get(x.twittercallback);

routeUsuario.route('/login/instagram/callback')
        .get(x.instagramcallback);        

routeUsuario.route('/login/google/callback')
        .get(x.googlecallback);  

routeUsuario.route('/data/usuario/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeUsuario;

