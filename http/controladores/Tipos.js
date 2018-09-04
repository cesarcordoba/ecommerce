const db = require('../relaciones');
var { tipo } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => tipo.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => tipo.findById(req.params.id)
    .then(tipo => tipo.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => tipo.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    tipo.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    tipo.findAll()
    .then(response => res.status(200).jsonp(response))
