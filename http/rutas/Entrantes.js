var route = require('express').Router();
var x = require('../controladores/Entrantes');

route.route('/data/entrante')
        .get(x.read)
        .post(x.create);

route.route('/data/entrante/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;
