var route = require('express').Router();
var x = require('../controladores/Observaciones');

route.route('/data/observacion')
        .get(x.read)
        .post(x.create);

route.route('/data/observacion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
