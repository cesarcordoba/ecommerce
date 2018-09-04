var route = require('express').Router();
var x = require('../controladores/Favoritos');

route.route('/data/favorito')
        .get(x.read)
        .post(x.create);

route.route('/data/favorito/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

