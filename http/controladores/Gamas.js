const _ = require('lodash');
const db = require('../relaciones');
var { gama } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => gama.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => gama.findById(req.params.id)
    .then(gama => gama.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => gama.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    gama.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    gama.findAll()
    .then(response => res.status(200).jsonp(response))


ex.filtro = (req, res, next) =>
    gama.findAndCountAll({
		order : ['nombre']
	}).then(response =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                paginas : Math.round(response.count / req.body.limite)
            })
        )
    )

ex.productos =  (req, res, next) =>
	gama.findById(req.params.id)
	.then(item => item.getProductos())
	.then(result => res.status(200).jsonp(result))

ex.gamaXmarca =  (req, res, next) =>
	gama.findAll({ where : { IdMarca : req.params.id}})
	.then(response => res.status(200).jsonp(response))
