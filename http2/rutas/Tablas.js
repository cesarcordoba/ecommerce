var route = require('express').Router();
var x = require('../controladores/Tablas');

route.route('/data/tablas/inicial/')
    .get(x.inicial)

route.route('/data/tablas/sinconizar')
    .get(x.sincronizar)

route.route('/data/tablas/separar/')
    .get(x.separar);

route.route('/data/tablas/numeros/')
    .get(x.numeros);


route.route('/data/tablas/marcas/')
    .get(x.marcas);

route.route('/data/tablas')
    .get(x.read)
    .post(x.create);

route.route('/data/tablaXbase/:id')
    .get(x.tablaXbase)

route.route('/data/tabla/cantidad/:id')
    .get(x.cantidad)

route.route('/data/tablas/:id')
    .get(x.read)
    .put(x.update)
    .delete(x.delete);

route.route('/data/categorias')
    .get(x.categorias);

module.exports = route;
