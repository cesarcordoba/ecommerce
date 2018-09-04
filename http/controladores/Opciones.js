const db = require('../relaciones');
var { opcion } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => opcion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => opcion.findById(req.params.id)
    .then(opcion => opcion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => opcion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    opcion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    opcion.findAll()
    .then(response => res.status(200).jsonp(response))
