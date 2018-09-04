const db = require('../relaciones');
var { saliente } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => saliente.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => saliente.findById(req.params.id)
    .then(saliente => saliente.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => saliente.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    saliente.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    saliente.findAll()
    .then(response => res.status(200).jsonp(response))
