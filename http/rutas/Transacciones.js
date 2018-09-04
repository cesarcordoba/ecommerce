var route = require('express').Router();
var x = require('../controladores/Transacciones');

route.route('/data/transaccion')
        .get(x.read)
        .post(x.create);

route.route('/data/transaccion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

