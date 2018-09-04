const _ = require('lodash');
const db = require('../relaciones');
var { linea } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => linea.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => linea.findById(req.params.id)
    .then(linea => linea.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => linea.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    linea.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    linea.findAll()
    .then(response => res.status(200).jsonp(response))

ex.filtro = (req, res, next) =>
    linea.findAndCountAll({
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
	linea.findById(req.params.id)
	.then(item => item.getProductos())
	.then(result => res.status(200).jsonp(result))


ex.lineaXmarca =  (req, res, next) =>
	linea.findAll({where : { IdMarca : req.params.id}})
	.then(response => res.status(200).jsonp(response))
