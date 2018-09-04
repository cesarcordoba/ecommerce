const db = require('../relaciones');
var { entrante } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => entrante.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => entrante.findById(req.params.id)
    .then(entrante => entrante.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => entrante.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    entrante.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    entrante.findAll()
    .then(response => res.status(200).jsonp(response))
