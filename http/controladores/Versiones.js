const _ = require('lodash');
const db = require('../relaciones');
var { version, opcion, color, inventario } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => version.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => version.findById(req.params.id)
    .then(version => version.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => version.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    version.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    version.findAll()
    .then(response => res.status(200).jsonp(response))

ex.ligaropciones = (req, res, next) =>
    version.findById(req.body.id)
	.then(item => item.setOpciones(req.body.opciones))
	.then(result => res.status(200).jsonp(result))

ex.opciones = (req, res, next) =>
	version.findById(req.params.id)
	.then(item => item.getOpciones())
	.then(result => res.status(200).jsonp(result))

ex.opcionesdisponibles = (req, res, next) =>
	version.findById(req.params.id)
	.then(item => item.getOpciones({ where : {  status : 1  } }))
	.then(result => res.status(200).jsonp(result))


ex.colores =  (req, res, next) =>
	version.findById(req.params.id)
	.then(item => item.getColores())
	.then(result => res.status(200).jsonp(result))


ex.ligaropcion =  (req, res, next) =>
	version.findById(req.params.version)
	.then(item => item.addOpciones(req.params.opcion))
	.then(result => res.status(200).jsonp(result))


ex.desligaropcion =  (req, res, next) =>
	version.findById(req.params.version)
	.then(item => item.removeOpciones(req.params.opcion))
	.then(result => res.status(200).jsonp(result))

ex.contar =  (req, res, next) =>
	version.count({where : {IdProducto : req.params.id }})
	.then(result => res.status(200).jsonp(result))

ex.contarSucursales =  (req, res, next) => {

    version.findById(req.params.id)
    .then(item => item.getSucursales())
	.then(response => res.status(200).jsonp(response.length))

}

ex.sucursales =  (req, res, next) => {

    version.findById(req.params.id)
    .then(item => item.getSucursales())
	.then(response => res.status(200).jsonp(response))

}

ex.precioydescuento =  (req, res, next) =>
    version.findById(req.params.id)
    .then(item => item.getSucursales())
	.then(sucursales => Promise.all( sucursales.map( async (n) => await Promise.all([
		n.inventarios.getPrecios({plain: true}),
		n.inventarios.getDescuentos({plain: true})
	]))))
    .then(response => response.reduce((ac, v) => new Object({
        precio :  !_.isNull(v[0]) ? ( ac.precio.cantidad > v[0].cantidad ? ac.precio : v[0] ) : ac.precio,
        descuento : !_.isNull(v[1]) ?  ( ac.descuento.cantidad >
            v[1].cantidad ?
                ac.descuento : v[1] )
                : ac.descuento
    }), { precio : {cantidad : 0} , descuento : {cantidad : 0}}))
    .then(response => res.status(200).jsonp(response))

ex.precio =  (req, res, next) => {
    version.findById(req.params.id)
    .then(item => item.getSucursales({where : {id : 1}}))
	.then(sucursales => Promise.all(
        sucursales.map( async (n) => await n.inventarios.getPrecios({plain: true})
    )))
    .then(response => response.reduce((ac , v ) =>  ac + v.cantidad, 0) / response.length)
    .then(response => res.status(200).jsonp(response))
}

ex.descuento =  (req, res, next) =>
    version.findById(req.params.id)
    .then(item => item.getSucursales({where : {id : 1}}))
	.then(sucursales => Promise.all(
        sucursales.map( async (n) => await n.inventarios.getDescuentos({plain: true})
    )))
    .then(response => response.reduce((ac , v ) => !_.isNull(v) ? ac + v.cantidad : ac, 0) / response.length )
    .then(response => res.status(200).jsonp(response))



ex.procesar =  (req, res, next) => {

    const datos = (page) =>  new Promise(resolve => resolve( _.chunk(req.body, 1)[page] ))

    const versiones = {
        [Symbol.asyncIterator]: async function* () {

            let page = 0
            let cache = null

            while(!_.isNull(cache) || page === 0) {

                cache = await datos(page)

                for (const n of cache){

                    yield await version.update({nombre : n.nombre}, {where : { id : n.version}})

                    yield await Promise.all(
                        n.palabras.map(async (opcioncita) => {

                            if(opcioncita.accion.nombre === "color")

                                return color.findOrCreate({ where : { nombre : opcioncita.palabra }})
                                .spread((colorcito , status) => colorcito.addVersiones(n.version))

                            if(opcioncita.accion.nombre === "atributo")
                                return opcion.findOrCreate({ where : { nombre : opcioncita.palabra, IdAtributo : opcioncita.accion.id }})
                                .spread((opcioncita , status) => opcioncita.addVersiones(n.version))
                        })
                    )

                }

                page = page + 1

            }
        }
    }

    ;(async function(){

        for await (const version of versiones[ Symbol.asyncIterator ]() ){
            // console.log(version)
        }

    })()


    // console.log(req.body)
    //
    // Promise.all(
    //     req.body.palabras.map(async (opcioncita) =>
    //         opcion.findOrCreate({ where : { nombre : opcioncita.palabra, IdAtributo : opcioncita.accion.id }})
    //         .spread((opcioncita , status) => opcioncita)
    //     )
    // ).then(response => console.log(response))

	// version.count({where : {IdProducto : req.params.id }})
	// .then(result => res.status(200).jsonp(result))

}


ex.entrantes =  (req, res, next) => version.findById(req.params.id)
    .then(item => item.getEntrantes())
	.then(response => res.status(200).jsonp(response))


ex.salientes =  (req, res, next) => version.findById(req.params.id)
    .then(item => item.getSalientes())
	.then(response => res.status(200).jsonp(response))


ex.actualizar =  (req, res, next) => {

    version.findById(req.params.id)
    .then(v => v.getInventarios())
    .then(i =>
        Promise.all(i.map(async (i) =>
            new Object({
                e : await i.getExistencias(),
                p : await i.getPrecios(),
                // d : await i.getDescuentos()
            })
    )))
    .then(response => response.reduce((ac, v) => {
        v.e.forEach(n => ac.e.push(n))
        v.p.forEach(n => ac.p.push(n))
        // v.d.forEach(n => ac.d.push(n))
        return ac
    }, {
        e : [],
        p : [],
        // d : [],
    }))
    .then(response => {

        let precio = response.p.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)).pop()
        let existencia = response.e.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)).pop()

        version.update({
            precio : precio ? precio.cantidad : 0,
            existencia : existencia ? existencia.cantidad : 0
        }, { where : {id : req.params.id } })

        return new Object({
            precio : precio ? precio.cantidad : 0,
            existencia : existencia ? existencia.cantidad : 0
        })

    })
    .then(response => res.status(200).jsonp(response))

}

ex.inventarios =  (req, res, next) => version.findById(req.params.id)
    .then(item => item.getInventarios())
	.then(response => res.status(200).jsonp(response))

ex.busqueda =  (req, res, next) => version.findAll({
        where : {
            nombre : {
                $like :  '%' + req.body.nombre + '%',
            }
        }
    })
	.then(response => res.status(200).jsonp(response))
