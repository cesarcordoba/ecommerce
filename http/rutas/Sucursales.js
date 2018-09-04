var route = require('express').Router();
var x = require('../controladores/Sucursales');

route.route('/data/sucursal')
        .get(x.read)
        .post(x.create);

route.route('/data/sucursal/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/filtroXsucursal')
        .put(x.filtro);

route.route('/data/productosXsucursal')
        .put(x.productos);

module.exports = route;
