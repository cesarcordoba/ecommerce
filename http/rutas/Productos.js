var route = require('express').Router();
var x = require('../controladores/Productos');

route.route('/data/producto')
        .get(x.read)
        .post(x.create);

route.route('/data/producto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/filtroXproducto')
        .put(x.filtro);

route.route('/data/busquedaXproducto')
        .put(x.busqueda);

route.route('/data/producto/ligargama/:producto/:gama')
        .get(x.ligargama)

route.route('/data/producto/ligarmarca/:producto/:marca')
        .get(x.ligarmarca)

route.route('/data/producto/ligarlinea/:producto/:linea')
        .get(x.ligarlinea)

route.route('/data/producto/portada/:id')
        .get(x.portada);

route.route('/data/producto/imagenes/:id')
        .get(x.imagenes);

route.route('/data/producto/observaciones/:id')
        .get(x.observaciones);

route.route('/data/producto/ambientes/:id')
        .get(x.ambientes);

route.route('/data/producto/versiones/:id')
        .get(x.versiones)

route.route('/data/producto/promo/:id')
        .get(x.promo)

route.route('/data/producto/versionesdisponibles/:id')
        .get(x.versionesdisponibles)


route.route('/data/producto/addVersion/:producto/:version')
        .get(x.addVersion)

route.route('/data/procesosXproducto')
        .get(x.procesos)

route.route('/data/producto/procesosXmarca/:id')
        .get(x.procesosXmarca)

route.route('/data/producto/procesosXgama/:id')
        .get(x.procesosXgama)

route.route('/data/producto/procesosXlinea/:id')
        .get(x.procesosXlinea)

route.route('/data/producto/procesosXcategoria/:id')
        .get(x.procesosXcategoria)


module.exports = route;
