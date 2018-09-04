var route = require('express').Router();
var x = require('../controladores/Bases');

route.route('/data/bases/inicial/')
    .get(x.inicial)

route.route('/data/bases')
    .get(x.read)
    .post(x.create);

route.route('/data/bases/:id')
    .get(x.read)
    .put(x.update)
    .delete(x.delete);


module.exports = route;
