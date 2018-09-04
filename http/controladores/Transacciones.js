const db = require('../relaciones');
var { transaccion } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => transaccion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => transaccion.findById(req.params.id)
    .then(transaccion => transaccion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => transaccion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    transaccion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    transaccion.findAll()
    .then(response => res.status(200).jsonp(response))
