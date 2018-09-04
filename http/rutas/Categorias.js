var route = require('express').Router();
var x = require('../controladores/Categorias');

route.route('/data/categoria')
        .get(x.read)
        .post(x.create);

route.route('/data/categoria/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/subcategorias/:id')
        .get(x.subcategorias);

route.route('/data/filtroXcategoria')
        .put(x.filtro);


route.route('/data/categoria/ligaratributo/:categoria/:atributo')
        .get(x.ligaratributo)

route.route('/data/categoria/desligaratributo/:categoria/:atributo')
        .get(x.desligaratributo);

route.route('/data/categoria/atributos/:id')
        .get(x.atributos);


route.route('/data/categoria/nivel/:nivel')
        .get(x.nivel);


route.route('/data/categoria/cambiarNivel/:hijo/:padre')
        .get(x.cambiarNivel);

route.route('/data/categoriascompleto')
        .get(x.completo);


route.route('/data/ultimoproductoXcategoria/:id')
        .get(x.ultimoproducto);



module.exports = route;
