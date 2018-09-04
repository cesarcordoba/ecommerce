const db = require('../relaciones');
var { factura } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => factura.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => factura.findById(req.params.id)
    .then(factura => factura.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => factura.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    factura.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    factura.findAll()
    .then(response => res.status(200).jsonp(response))
