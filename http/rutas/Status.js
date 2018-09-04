var route = require('express').Router();
var x = require('../controladores/Status');

route.route('/data/status')
        .get(x.read)
        .post(x.create);

route.route('/data/status/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

