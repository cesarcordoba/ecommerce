var route = require('express').Router();
var x = require('../controladores/Fotos');

route.route('/data/foto')
        .get(x.read)
        .post(x.create);

route.route('/data/foto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

