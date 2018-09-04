const db = require('../relaciones');
var { espacio } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => {
    espacio.findOrCreate({ where : { IdAmbiente : req.body.IdAmbiente } })
    .spread((espacio , status) => espacio.update(req.body))
    .then(response => res.status(200).jsonp(response))
}

ex.delete = (req, res, next) => espacio.findById(req.params.id)
    .then(espacio => espacio.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => espacio.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    espacio.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    espacio.findAll()
    .then(response => res.status(200).jsonp(response))

ex.contar = (req, res, next) => espacio.count({ where: { IdAmbiente: req.params.id } } )
    .then(response => res.status(200).jsonp(response))
