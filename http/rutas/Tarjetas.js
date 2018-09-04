var route = require('express').Router();
var x = require('../controladores/Tarjetas');

route.route('/data/tarjeta')
        .get(x.read)
        .post(x.create);

route.route('/data/tarjeta/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

