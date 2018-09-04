const db = require('../relaciones');
var { existencia } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => existencia.create(req.body)
    .then(e => e.addInventario(req.body.inventario))
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => existencia.findById(req.params.id)
    .then(existencia => existencia.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => existencia.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    existencia.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    existencia.findAll()
    .then(response => res.status(200).jsonp(response))
