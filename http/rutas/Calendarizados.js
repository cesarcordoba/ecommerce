var route = require('express').Router();
var x = require('../controladores/Calendarizados');

module.exports = route;


route.route('/data/sincronizarProductos')
        .get(x.sincronizarProductos)
