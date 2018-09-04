var route = require('express').Router();
var x = require('../controladores/Direcciones');

route.route('/data/direccion')
        .get(x.read)
        .post(x.create);

route.route('/data/direccion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

