const db = require('../relaciones');
var { avatar } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => avatar.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => avatar.findById(req.params.id)
    .then(avatar => avatar.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => avatar.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    avatar.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    avatar.findAll()
    .then(response => res.status(200).jsonp(response))
