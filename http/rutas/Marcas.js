var route = require('express').Router();
var x = require('../controladores/Marcas');

route.route('/data/marca')
        .get(x.read)
        .post(x.create);

route.route('/data/marca/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/marcasdisponibles')
        .get(x.disponibles)

route.route('/data/filtroXmarca')
        .put(x.filtro);

route.route('/data/marca/productos/:id')
        .get(x.productos);


module.exports = route;
