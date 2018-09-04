const _ = require('lodash');
const db = require('../relaciones');
var { producto , version, categoria, promo, opcion } = db;


const resolucion = require('../factories/resolucion');

var ex = module.exports = {};

ex.create = (req, res, next) => producto.create(req.body)
	.then(response => {
		version.create({IdProducto : response.id })
		return response
	})
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => producto.findById(req.params.id)
    .then(producto => producto.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => producto.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    producto.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    producto.findAll()
    .then(response => res.status(200).jsonp(response))


ex.busqueda = (req, res, next) => producto.findAll({
        where : {
            nombre : {
                $like :  '%' + req.body.nombre + '%',
            }
        }
    })
	.then(response => res.status(200).jsonp(response))



ex.filtro = (req, res, next) => {

	;(async function(){

		console.log(req.body)

		var buscar = (array, id) =>  array.filter(n => n.IdCategoria === id).map(n => [  n.id, buscar(array, n.id) ])

		var peticion = {
			order : req.body.order,
			where : req.body.where,
			include : []
		}

		if(req.body.promo)
			peticion.include.push({
				model : promo,
				as : 'Promos',
				where : {status : 1}
			})

		if(req.body.version)
			peticion.include.push({
				model : version,
				as : 'Versiones',
				where : { nombre :
					{ $like :  '%' + req.body.version + '%'}
				}
			})

		if(req.body.opcion)
			peticion.include.push({
				model : version,
				as : 'Versiones',
				where : {status : 1},
				include : [
					{
						model : opcion,
						as : 'Opciones',
						where : { status : 1, id : { $or :  req.body.opcion } }
					}
				]
			})

		if(req.body.nombre)
			peticion.where.push({
				nombre :
					{ $like :  '%' + req.body.nombre + '%'}
				})

		if(req.body.categoria)
			await categoria.findAll()
			.then(response => {
				peticion.where.push({ IdCategoria : {  $or : _.flattenDeep([req.body.categoria.id, buscar(response, req.body.categoria.id)])   }    }   )
			})

		if(req.body.Marcas)
			peticion.where.push({ IdMarca : req.body.Marcas })

	    await producto.findAndCountAll(peticion)
		.then(response => res.status(200).jsonp(
	            new Object({
					peticion : peticion,
	                items : _.chunk(response.rows, req.body.limite)[req.body.pagina - 1],
	                paginas : Math.ceil(response.count / req.body.limite)
	            })))

	})()

}

ex.ligargama =  (req, res, next) =>
	producto.findById(req.params.producto)
	.then(item => item.setGama(req.params.gama))
	.then(result => res.status(200).jsonp(result))

ex.ligarmarca =  (req, res, next) =>
	producto.findById(req.params.producto)
	.then(item => item.setMarca(req.params.marca))
	.then(result => res.status(200).jsonp(result))

ex.ligarlinea =  (req, res, next) =>
	producto.findById(req.params.producto)
	.then(item => item.setLinea(req.params.linea))
	.then(result => res.status(200).jsonp(result))

ex.portada =  (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getPortada())
	// .then(result => resolucion().procesar(result))
	.then(result => res.status(200).jsonp(result))

ex.imagenes =  (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getImagenes({  attributes : ['id'] }))
	.then(result => res.status(200).jsonp(result))

ex.observaciones =  (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getObservaciones())
	.then(result => res.status(200).jsonp(result))

ex.ambientes =  (req, res, next) => {
	producto.findById(req.params.id)
	.then(item => item.getAmbientes())
	.then(result => res.status(200).jsonp(result))}


ex.versiones =  (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getVersiones())
	.then(result => res.status(200).jsonp(result))


ex.promo = (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getPromos())
	.then(result => res.status(200).jsonp(result))

ex.versionesdisponibles =  (req, res, next) =>
	producto.findById(req.params.id)
	.then(item => item.getVersiones({where : {status : 1 }}))
	.then(result => res.status(200).jsonp(result))



ex.addVersion =  (req, res, next) =>
	producto.findById(req.params.producto)
	.then(item => item.addVersiones(req.params.version))
	.then(result => res.status(200).jsonp(result))


ex.procesos =  (req, res, next) => Promise.all([
		producto.count(),
		producto.count({where : { status : 1  }}),
		producto.count({where : { status : 2  }}),
		producto.count({where : { status : 3  }}),
		producto.count({where : { status : 4  }}),
		producto.count({where : { status : 5  }}),
		producto.count({where : { status : 6  }}),
		producto.count({where : { status : 0 }})
	])
	.then(result => res.status(200).jsonp(result))

ex.procesosXmarca =  (req, res, next) =>
	Promise.all([
		producto.count({where : { IdMarca : req.params.id, status : 1  }}),
		producto.count({where : { IdMarca : req.params.id , status : 0 }})
	])
	.then(result => res.status(200).jsonp(result))

ex.procesosXgama =  (req, res, next) =>
	Promise.all([
		producto.count({where : { IdGama : req.params.id, status : 1  }}),
		producto.count({where : { IdGama : req.params.id , status : 0 }})
	])
	.then(result => res.status(200).jsonp(result))

ex.procesosXlinea =  (req, res, next) =>
	Promise.all([
		producto.count({where : { IdLinea : req.params.id, status : 1  }}),
		producto.count({where : { IdLinea : req.params.id , status : 0 }})
	])
	.then(result => res.status(200).jsonp(result))

ex.procesosXcategoria =  (req, res, next) =>
	Promise.all([
		producto.count({where : { IdCategoria : req.params.id, status : 1  }}),
		producto.count({where : { IdCategoria : req.params.id , status : 0 }})
	])
	.then(result => res.status(200).jsonp(result))
