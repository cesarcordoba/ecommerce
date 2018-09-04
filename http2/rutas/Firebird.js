var route = require('express').Router();
var x = require('../controladores/Firebird');

route.route('/data/firebird')
        .put(x.obtener);

route.route('/data/tablas')
        .put(x.tablas);

route.route('/data/nuevaconexion')
    .get(x.nuevaconexion)

module.exports = route;
