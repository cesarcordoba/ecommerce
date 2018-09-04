var route = require('express').Router();
var x = require('../controladores/Facturas');

route.route('/data/factura')
        .get(x.read)
        .post(x.create);

route.route('/data/factura/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

