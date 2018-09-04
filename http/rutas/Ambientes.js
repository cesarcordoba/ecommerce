var route = require('express').Router();
var x = require('../controladores/Ambientes');

route.route('/data/ambiente')
        .get(x.read)
        .post(x.create);

route.route('/data/ambiente/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/filtroXambiente')
        .put(x.filtro);

route.route('/data/ambiente/relacionados/:id')
        .get(x.relacionados);

route.route('/data/ambiente/productos/:id')
        .get(x.productos);

route.route('/data/ambiente/gama/:id')
        .get(x.gama);

route.route('/data/ambiente-producto/:ambiente/:producto')
        .get(x.ligarproducto)
        .delete(x.desligarproducto);

route.route('/data/ambiente/crearYligar/:id')
        .get(x.crearYligar);

route.route('/data/ambiente/espacio/:id')
        .get(x.espacio);




module.exports = route;
