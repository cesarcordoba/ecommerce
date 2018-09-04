var route = require('express').Router();
var x = require('../controladores/Lineas');

route.route('/data/linea')
        .get(x.read)
        .post(x.create);

route.route('/data/linea/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/filtroXlinea')
        .put(x.filtro);

route.route('/data/linea/productos/:id')
        .get(x.productos);

route.route('/data/lineaXmarca/:id')
        .get(x.lineaXmarca);



module.exports = route;
