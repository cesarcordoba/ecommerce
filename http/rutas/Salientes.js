var route = require('express').Router();
var x = require('../controladores/Salientes');

route.route('/data/saliente')
        .get(x.read)
        .post(x.create);

route.route('/data/saliente/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
