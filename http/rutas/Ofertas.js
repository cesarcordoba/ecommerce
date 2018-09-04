var route = require('express').Router();
var x = require('../controladores/Ofertas');

route.route('/data/oferta')
        .get(x.read)
        .post(x.create);

route.route('/data/oferta/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/oferta/entrantes/:id')
        .get(x.entrantes)

route.route('/data/oferta/salientes/:id')
        .get(x.salientes)

module.exports = route;
