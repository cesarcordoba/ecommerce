const db = require('../relaciones');
var { color } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => color.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => color.findById(req.params.id)
    .then(color => color.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => color.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    color.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    color.findAll()
    .then(response => res.status(200).jsonp(response))

ex.disponibles = (req, res, next) => color.findAll({where : {status : 1}})
    .then(response => res.status(200).jsonp(response))


ex.addVersion =  (req, res, next) =>
	color.findById(req.params.color)
	.then(item => item.addVersiones(req.params.version))
	.then(result => res.status(200).jsonp(result))

ex.removeVersion =  (req, res, next) =>
	color.findById(req.params.color)
	.then(item => item.removeVersiones(req.params.version))
	.then(result => res.status(200).jsonp(result))
