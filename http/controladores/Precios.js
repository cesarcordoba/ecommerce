const db = require('../relaciones');
var { precio } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => precio.create(req.body)
	.then(p => p.addInventario(req.body.inventario))
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => precio.findById(req.params.id)
    .then(precio => precio.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => precio.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    precio.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    precio.findAll()
    .then(response => res.status(200).jsonp(response))
