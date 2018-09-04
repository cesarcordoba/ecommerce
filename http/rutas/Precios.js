var route = require('express').Router();
var x = require('../controladores/Precios');

route.route('/data/precio')
        .get(x.read)
        .post(x.create);

route.route('/data/precio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

