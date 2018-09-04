var route = require('express').Router();
var x = require('../controladores/Gamas');

route.route('/data/gama')
        .get(x.read)
        .post(x.create);

route.route('/data/gama/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/filtroXgama')
        .put(x.filtro);

route.route('/data/gama/productos/:id')
        .get(x.productos);

route.route('/data/gamaXmarca/:id')
        .get(x.gamaXmarca);

module.exports = route;
