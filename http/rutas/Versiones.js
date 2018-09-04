var route = require('express').Router();
var x = require('../controladores/Versiones');

route.route('/data/version')
        .get(x.read)
        .post(x.create);

route.route('/data/version/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/versionligaropciones')
        .put(x.ligaropciones)

route.route('/data/actualizarversion/:id')
        .get(x.actualizar)

route.route('/data/version/desligaropcion/:version/:opcion')
        .get(x.desligaropcion);

route.route('/data/version/opciones/:id')
        .get(x.opciones);

route.route('/data/version/opcionesdisponibles/:id')
        .get(x.opcionesdisponibles);

route.route('/data/version/colores/:id')
        .get(x.colores);

route.route('/data/version/contar/:id')
        .get(x.contar);

route.route('/data/version/sucursales/:id')
        .get(x.sucursales);

route.route('/data/procesarversion')
        .put(x.procesar);

route.route('/data/version/contarSucursales/:id')
        .get(x.contarSucursales);

route.route('/data/version/precio/:id')
        .get(x.precio);

route.route('/data/version/descuento/:id')
        .get(x.descuento);

route.route('/data/version/precioydescuento/:id')
        .get(x.precioydescuento);

route.route('/data/version/entrantes/:id')
        .get(x.entrantes);

route.route('/data/version/inventarios/:id')
        .get(x.inventarios);

route.route('/data/busquedaXversion')
        .put(x.busqueda);


module.exports = route;
