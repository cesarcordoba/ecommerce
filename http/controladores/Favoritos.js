const db = require('../relaciones');
var { favorito } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => favorito.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => favorito.findById(req.params.id)
    .then(favorito => favorito.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => favorito.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    favorito.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    favorito.findAll()
    .then(response => res.status(200).jsonp(response))
