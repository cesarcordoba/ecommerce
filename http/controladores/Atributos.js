const db = require('../relaciones');
var { atributo } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => atributo.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => atributo.findById(req.params.id)
    .then(atributo => atributo.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => atributo.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    atributo.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    atributo.findAll()
    .then(response => res.status(200).jsonp(response))

ex.ligaropcion =  (req, res, next) =>
	atributo.findById(req.params.atributo)
	.then(item => item.addOpciones(req.params.opcion))
	.then(result => res.status(200).jsonp(result))


ex.desligaropcion =  (req, res, next) =>
	atributo.findById(req.params.atributo)
	.then(item => item.removeOpciones(req.params.opcion))
	.then(result => res.status(200).jsonp(result))

ex.opciones = (req, res, next) =>
	atributo.findById(req.params.id)
	.then(item => item.getOpciones())
	.then(result => res.status(200).jsonp(result))
