var route = require('express').Router();
var x = require('../controladores/Tipos');

route.route('/data/tipo')
        .get(x.read)
        .post(x.create);

route.route('/data/tipo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

