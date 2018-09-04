var route = require('express').Router();
var x = require('../controladores/Existencias');

route.route('/data/existencia')
        .get(x.read)
        .post(x.create);

route.route('/data/existencia/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
