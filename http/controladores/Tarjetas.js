const db = require('../relaciones');
var { tarjeta } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => tarjeta.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => tarjeta.findById(req.params.id)
    .then(tarjeta => tarjeta.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => tarjeta.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    tarjeta.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    tarjeta.findAll()
    .then(response => res.status(200).jsonp(response))
