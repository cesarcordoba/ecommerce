var route = require('express').Router();
var x = require('../controladores/Paquetes');

route.route('/data/paquete')
        .get(x.read)
        .post(x.create);

route.route('/data/paquete/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

