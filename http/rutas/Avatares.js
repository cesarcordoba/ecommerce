var route = require('express').Router();
var x = require('../controladores/Avatares');

route.route('/data/avatar')
        .get(x.read)
        .post(x.create);

route.route('/data/avatar/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

