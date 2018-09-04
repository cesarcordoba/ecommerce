var route = require('express').Router();
var x = require('../controladores/Rows');

route.route('/data/rows/inicial/')
    .get(x.inicial)
    
route.route('/data/rows')
    .get(x.read)
    .post(x.create);

route.route('/data/rows/:id')
    .get(x.read)
    .put(x.update)
    .delete(x.delete);


module.exports = route;
