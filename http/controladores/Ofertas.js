const db = require('../relaciones');
var { oferta } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => oferta.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => oferta.findById(req.params.id)
    .then(oferta => oferta.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => oferta.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    oferta.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    oferta.findAll()
    .then(response => res.status(200).jsonp(response))


ex.entrantes =  (req, res, next) => oferta.findById(req.params.id)
    .then(item => item.getEntrantes())
	.then(response => res.status(200).jsonp(response))


ex.salientes =  (req, res, next) => oferta.findById(req.params.id)
    .then(item => item.getSalientes())
	.then(response => res.status(200).jsonp(response))
