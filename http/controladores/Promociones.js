const db = require('../relaciones');
var { promo } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => promo.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => promo.findById(req.params.id)
    .then(promo => promo.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => promo.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    promo.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    promo.findAll()
    .then(response => res.status(200).jsonp(response))

ex.productos = (req, res, next) => promo.findById(req.params.id)
    .then(response => response.getProductos())
    .then(response => res.status(200).jsonp(response))

ex.ofertas = (req, res, next) => promo.findById(req.params.id)
    .then(response => response.getOfertas())
    .then(response => res.status(200).jsonp(response))

ex.descuentos = (req, res, next) => promo.findById(req.params.id)
    .then(response => response.getDescuentos())
    .then(response => res.status(200).jsonp(response))

ex.addProducto =  (req, res, next) =>
	promo.findById(req.params.promo)
	.then(item => item.addProductos(req.params.producto))
	.then(result => res.status(200).jsonp(result))

ex.removeProducto =  (req, res, next) =>
	promo.findById(req.params.promo)
	.then(item => item.removeProductos(req.params.producto))
	.then(result => res.status(200).jsonp(result))
