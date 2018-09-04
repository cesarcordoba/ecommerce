var route = require('express').Router();
var x = require('../controladores/Descuentos');

route.route('/data/descuento')
        .get(x.read)
        .post(x.create);

route.route('/data/descuento/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/descuento-version/:descuento/:version')
        .get(x.ligarversion);


route.route('/data/descuento/versiones/:id')
        .get(x.versiones)




module.exports = route;
