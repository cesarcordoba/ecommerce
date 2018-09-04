const db = require('../relaciones');
var { status } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => status.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => status.findById(req.params.id)
    .then(status => status.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => status.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    status.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    status.findAll()
    .then(response => res.status(200).jsonp(response))
