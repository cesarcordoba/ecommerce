const db = require('../relaciones');
var { foto } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => foto.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => foto.findById(req.params.id)
    .then(foto => foto.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => foto.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    foto.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    foto.findAll()
    .then(response => res.status(200).jsonp(response))
