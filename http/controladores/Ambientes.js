const AWS = require('aws-sdk');
var fs = require("fs");
var _ = require("lodash");
const db = require('../relaciones');
var { ambiente, producto } = db;

var ex = module.exports = {};

var s3 = new AWS.S3({
    accessKeyId: 'AKIAJ276W32MFP73B22A',
    secretAccessKey: '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'
})

ex.create = (req, res, next) => ambiente.create(req.body)
    .then(imagencita => s3.upload({
        Bucket: 'azulejos-imagenes',
        Key: imagencita.id + '.jpg',
        Body: new Buffer(req.body.imagen.replace(/^data:image\/\w+;base64,/, ""),'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
        ACL : 'public-read'
    }, function(err, data) {
        return imagencita.update({link : data.Location})
    }))
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => ambiente.findById(req.params.id)
    .then(ambiente => ambiente.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => ambiente.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    ambiente.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    ambiente.findAll()
    .then(response => res.status(200).jsonp(response))

ex.filtro = (req, res, next) =>
    ambiente.findAndCountAll({
		order : ['nombre'],
        attributes : ['id', 'nombre']
	}).then(response =>
        res.status(200).jsonp(
            new Object({
                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
                paginas : Math.round(response.count / req.body.limite)
            })
        )
    )

ex.relacionados = (req, res, next) => {

	ambiente.findById(req.params.id)
	.then(item => item.getProductos())
    .then(productos => _.uniq(productos.map(n => n.IdGama)))
    .then(response => producto.findAll({where : { IdGama : response}}))
    .then(response => Promise.all( response.map(async (n) => await n.getAmbientes())))
    .then(result => res.status(200).jsonp(_.uniqBy(_.flatten(result).filter(n => n.id !== Number(req.params.id)), 'id' )))


}

ex.gama = (req, res, next) => {

    producto.findAll({where : { IdGama : req.params.id}})
    .then(response => Promise.all( response.map(async (n) => await n.getAmbientes())))
	.then(result => res.status(200).jsonp(_.uniqBy(_.flatten(result).filter(n => n.id !== Number(req.params.id)), 'id' )))

}

ex.espacio = (req, res, next) =>
	ambiente.findById(req.params.id)
	.then(item => item.getEspacio())
	.then(result => res.status(200).jsonp(result))


ex.productos = (req, res, next) =>
	ambiente.findById(req.params.id)
	.then(item => item.getProductos())
	.then(result => res.status(200).jsonp(result))


ex.ligarproducto = (req, res, next) =>
	ambiente.findById(req.params.ambiente)
	.then(item => item.addProducto(req.params.producto, { through : {x : 0, y : 0 } }))
	.then(result => res.status(200).jsonp(result))


ex.desligarproducto = (req, res, next) =>
	ambiente.findById(req.params.ambiente)
	.then(item => item.removeProducto(req.params.producto))
	.then(result => res.status(200).jsonp(result))


ex.crearYligar = (req, res, next) =>
	ambiente.create()
	.then(item => {
        item.addProducto(req.params.id, { through : {x : 0, y : 0 } })
        return item
    })
	.then(result => res.status(200).jsonp(result))
