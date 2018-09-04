var route = require('express').Router();
var x = require('../controladores/Promociones');

route.route('/data/promo')
        .get(x.read)
        .post(x.create);

route.route('/data/promo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/promo/productos/:id')
        .get(x.productos)

route.route('/data/promo/ofertas/:id')
        .get(x.ofertas)

route.route('/data/promo/descuentos/:id')
        .get(x.descuentos)

route.route('/data/promo-producto/:promo/:producto')
        .put(x.addProducto)
        .put(x.removeProducto)

module.exports = route;
