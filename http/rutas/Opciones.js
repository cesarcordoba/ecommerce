var route = require('express').Router();
var x = require('../controladores/Opciones');

route.route('/data/opcion')
        .get(x.read)
        .post(x.create);

route.route('/data/opcion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

