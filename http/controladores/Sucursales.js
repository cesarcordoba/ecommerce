const _ = require('lodash');
const db = require('../relaciones');
var { sucursal } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => sucursal.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => sucursal.findById(req.params.id)
    .then(sucursal => sucursal.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => sucursal.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    sucursal.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    sucursal.findAll()
    .then(response => res.status(200).jsonp(response))

ex.filtro = (req, res, next) =>
    sucursal.findAndCountAll({
		order : ['nombre']
	}).then(response =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                paginas : Math.round(response.count / req.body.limite)
            })
        )
    )

ex.productos = (req, res, next) => {

    sucursal.findById(req.body.id)
    .then(sucursal => sucursal.getVersiones())
    .then(response => Object.entries(_.groupBy(response, (n) => n.IdProducto)))
    .then(response => res.status(200).jsonp(response))

    // console.log(req.body)

}
