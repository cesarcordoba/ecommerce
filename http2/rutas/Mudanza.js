var route = require('express').Router();
var x = require('../controladores/Mudanza');

route.route('/data/mudanza/colores/')
    .get(x.colores)

    route.route('/data/mudanza/precios/')
        .get(x.precios)

route.route('/data/mudanza/preciosejemplo/')
    .get(x.preciosejemplo)

route.route('/data/mudanza/promocionesejemplo/')
    .get(x.promocionesejemplo)

route.route('/data/mudanza/versiones/')
    .get(x.versiones)

route.route('/data/mudanza/productospromo/')
    .get(x.productospromo)

route.route('/data/mudanza/productosdescontinuados/')
    .get(x.productosdescontinuados)

route.route('/data/mudanza/cambiarstatusproductos/')
    .get(x.cambiarstatusproductos)

route.route('/data/mudanza/versionesnulas/')
    .get(x.versionesnulas)

route.route('/data/mudanza/imagenes/')
    .get(x.imagenes)


route.route('/data/mudanza/bucket/')
    .get(x.bucket)

module.exports = route;
