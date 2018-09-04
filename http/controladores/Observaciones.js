const db = require('../relaciones');
var { observacion } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => observacion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => observacion.findById(req.params.id)
    .then(observacion => observacion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => observacion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    observacion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    observacion.findAll()
    .then(response => res.status(200).jsonp(response))
