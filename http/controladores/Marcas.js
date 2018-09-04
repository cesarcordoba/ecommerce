const _ = require('lodash');
const db = require('../relaciones');
var { marca } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => marca.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => marca.findById(req.params.id)
    .then(marca => marca.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => marca.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    marca.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    marca.findAll()
    .then(response => res.status(200).jsonp(response))

ex.disponibles = (req, res, next) => {

    console.log('si')

    marca.findAll({where : {status : 1}})
    .then(response => res.status(200).jsonp(response))
}


ex.filtro = (req, res, next) =>
    marca.findAndCountAll({
		order : ['nombre']
	}).then(response =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                paginas : Math.round(response.count / req.body.limite)
            })
        )
    )

ex.productos =  (req, res, next) =>
	marca.findById(req.params.id)
	.then(item => item.getProductos())
	.then(result => res.status(200).jsonp(result))
