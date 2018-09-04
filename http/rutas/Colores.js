var route = require('express').Router();
var x = require('../controladores/Colores');

route.route('/data/color')
        .get(x.read)
        .post(x.create);

route.route('/data/color/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);


route.route('/data/coloresdisponibles')
        .get(x.disponibles)

route.route('/data/color-version/:color/:version')
        .put(x.addVersion)
        .delete(x.removeVersion)

module.exports = route;
