var route = require('express').Router();
var x = require('../controladores/Posiciones');

route.route('/data/posicion')
        .get(x.read)
        .put(x.update)
        .post(x.create);

route.route('/data/posicion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

// route.route('/data/posicion/:IdAmbiente/:IdProducto')
//         .put(x.update);

route.route('/data/posicion/contar/:id')
        .get(x.contar)

module.exports = route;
