var route = require('express').Router();
var x = require('../controladores/Atributos');

route.route('/data/atributo')
        .get(x.read)
        .post(x.create);

route.route('/data/atributo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/atributo/ligaropcion/:atributo/:opcion')
        .get(x.ligaropcion)

route.route('/data/atributo/desligaropcion/:atributo/:opcion')
        .get(x.desligaropcion);

route.route('/data/atributo/opciones/:id')
        .get(x.opciones);

module.exports = route;
