var route = require('express').Router();
var x = require('../controladores/Portadas');

route.route('/data/portada')
        .get(x.read)
        .post(x.create);

route.route('/data/portada/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/portadaXproducto/:id')
        .get(x.portadaXproducto)

module.exports = route;
