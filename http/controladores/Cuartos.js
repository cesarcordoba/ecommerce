const db = require('../relaciones');
var { cuarto } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => cuarto.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => cuarto.findById(req.params.id)
    .then(cuarto => cuarto.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => cuarto.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    cuarto.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    cuarto.findAll()
    .then(response => res.status(200).jsonp(response))
