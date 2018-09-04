const db = require('../relaciones');
var { inventario, producto, version, sucursal } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => inventario.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => inventario.findById(req.params.id)
    .then(inventario => inventario.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => inventario.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    inventario.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    inventario.findAll()
    .then(response => res.status(200).jsonp(response))


ex.versionesXproducto =  (req, res, next) => {

    version.findAll({
        include : [{
            model : sucursal,
            as : 'Sucursales',
            where : {
                id : req.params.sucursal
            }
        },
        {
            model : producto,
            as : 'Producto',
            where : {
                id : req.params.producto
            }
        }]
    })
    .then(response => res.status(200).jsonp(response.map(n =>
        new Object({
        id : n.id,
        nombre : n.nombre
    }))))
}

ex.precios = (req, res, next) => inventario.findById(req.params.id)
    .then(i => i.getPrecios())
    .then(response => res.status(200).jsonp(response))

ex.descuentos = (req, res, next) => inventario.findById(req.params.id)
    .then(i => i.getDescuentos())
    .then(response => res.status(200).jsonp(response))

ex.existencias = (req, res, next) => inventario.findById(req.params.id)
    .then(i => i.getExistencias())
    .then(response => res.status(200).jsonp(response))
