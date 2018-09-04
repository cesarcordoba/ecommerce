var route = require('express').Router();
var x = require('../controladores/Ordenes');

route.route('/data/orden')
        .get(x.read)
        .post(x.create);

route.route('/data/orden/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/orden/OpenPay/')
        .post(x.pagos);

        
module.exports = route;
