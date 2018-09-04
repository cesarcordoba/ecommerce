const db = require('../relaciones');
var { set } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => set.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => set.findById(req.params.id)
    .then(set => set.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => set.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    set.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    set.findAll()
    .then(response => res.status(200).jsonp(response))
