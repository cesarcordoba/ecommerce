var route = require('express').Router();
var x = require('../controladores/Inventarios');

route.route('/data/inventario')
        .get(x.read)
        .post(x.create);

route.route('/data/inventario/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/versionesXproducto/:sucursal/:producto')
        .get(x.versionesXproducto)

route.route('/data/inventario/precios/:id')
        .get(x.precios)

route.route('/data/inventario/descuentos/:id')
        .get(x.descuentos)

route.route('/data/inventario/existencias/:id')
        .get(x.existencias)

module.exports = route;
