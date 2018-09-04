var route = require('express').Router();
var x = require('../controladores/Cuartos');

route.route('/data/cuarto')
        .get(x.read)
        .post(x.create);

route.route('/data/cuarto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
