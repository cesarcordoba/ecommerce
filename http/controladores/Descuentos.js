const db = require('../relaciones');
var { descuento } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => descuento.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => descuento.findById(req.params.id)
    .then(descuento => descuento.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => descuento.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    descuento.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    descuento.findAll()
    .then(response => res.status(200).jsonp(response))

ex.ligarversion =  (req, res, next) =>
    descuento.findById(req.params.descuento)
    .then(item => item.addVersiones(req.params.version))
    .then(response => res.status(200).jsonp(response))

ex.versiones = (req, res, next) =>
    descuento.findById(req.params.id)
    .then(item => item.getVersiones())
    .then(response => res.status(200).jsonp(response))
