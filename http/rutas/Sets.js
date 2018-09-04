var route = require('express').Router();
var x = require('../controladores/Versiones');

route.route('/data/set')
        .get(x.read)
        .post(x.create);

route.route('/data/set/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
