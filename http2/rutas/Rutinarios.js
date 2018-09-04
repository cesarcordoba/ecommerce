var route = require('express').Router();
var x = require('../controladores/Rutinarios');

route.route('/data/rutinarios/crearExistencias')
    .get(x.crearExistencias)

module.exports = route;
