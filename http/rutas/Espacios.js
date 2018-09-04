var route = require('express').Router();
var x = require('../controladores/Espacios');

route.route('/data/espacio')
        .get(x.read)
        .post(x.create);

route.route('/data/espacio/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/espacio/contar/:id')
        .get(x.contar)



module.exports = route;
