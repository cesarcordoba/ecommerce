const db = require('../relaciones');
var { posicion } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => posicion.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => posicion.findById(req.params.id)
    .then(posicion => posicion.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => {

    // console.log(req.body)

    posicion.update(req.body, { where: { IdAmbiente : req.body.IdAmbiente , IdProducto :  req.body.IdProducto } } )
    .then(response => res.status(200).jsonp(response))
}
ex.read =  (req, res, next) => req.params.id ?
    posicion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    posicion.findAll()
    .then(response => res.status(200).jsonp(response))

ex.contar = (req, res, next) => posicion.count({ where: { IdProducto: req.params.id }})
    .then(response => res.status(200).jsonp(response))
