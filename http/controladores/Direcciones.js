const db = require('../relaciones');
var { direccion } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => direccion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => direccion.findById(req.params.id)
    .then(direccion => direccion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => direccion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    direccion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    direccion.findAll()
    .then(response => res.status(200).jsonp(response))
