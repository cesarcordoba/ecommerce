const AWS = require('aws-sdk');
const _ = require('lodash');
var fs = require("fs");
const db = require('../relaciones');
const db1 = require('../../http/relaciones');
var { base } = db;
var { color, opcion, atributo, marca, inventario, precio, producto, version, descuento, promo, sucursal, opcion, inventario, disponible, imagen, espacio, portada } = db1;


var ex = module.exports = {};

var s3 = new AWS.S3({
    accessKeyId: 'AKIAI57NI4DBLSRDCFNQ',
    secretAccessKey: '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'
})


ex.colores = (req, res, next) => {

    opcion.findAll({where : {IdAtributo : 1}})
    .then(response => Promise.all( response.map(
        async(n) => new Object({
            color : n,
            versiones : await n.getVersiones()
        })
    )))
    .then(response => {


        const items = response.reduce((ac, v) =>
           ac.concat(v.versiones.map(n => new Object({
               color : v.color.nombre,
               colorid : v.color.id,
               version : n.nombre,
               versionid : n.id
           })))
       , [])

       res.status(200).jsonp(items)

        // var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 100)[page]) )
        //
		// datos(1).then(response => res.status(200).jsonp(response))



        // const colores = {
        //     [Symbol.asyncIterator]: async function* () {
        //
        //         let
        //             page = 0,
        //             cache = null
        //
        //         while(!_.isNull(cache) || page === 0) {
        //
        //             cache = await datos(page)
        //
        //             for (const n of cache){
        //
        //
        //                 yield await color.findOrCreate({where : { nombre : n.color }})
        //                 .spread((response, status) => response.addVersiones(n.id))
        //
        //                 yield await opcion.findById(n.colorid)
        //                 .then(response => response.removeVersiones(n.versionid))
        //
        //             }
        //
        //             page = page + 1
        //
        //         }
        //     }
        // }
        //
        // ;(async function(){
        //     for await (const color of colores[ Symbol.asyncIterator ]() ){
        //         // console.log(color)
        //     }
        // })()

    })
}

ex.precios = (req, res, next) => {

    version.findAll({
        // order : ['IdVersion']
    })
    .then(response => {

        // const items = Object.entries(_.groupBy(response, (x) => x.IdVersion )).map(n => new Object({ version : Number(n[0]), inventarios : n[1]  }))
        //
        // const items =

        var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(response, 10)[page]) )

        datos(1).then(response => res.status(200).jsonp(response))

        const generador = {
            [Symbol.asyncIterator]: async function* () {

                let
                    page = 0,
                    cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        n.update(  { precio : _.random(0, 100)} )

                        // yield await precio.create({cantidad : _.random(0, 100), status : true })
                        // .then(precio =>
                        //     Promise.all( n.inventarios.map(async (n) =>
                        //         n.addPrecios(precio.id))))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){
            for await (const item of generador[ Symbol.asyncIterator ]() ){
                // console.log(color)
            }
        })()

    })

}


ex.promocionesejemplo = (req, res, next) => {

    producto.findAll({
        where : {  status : 1, IdCategoria : 1 },
        include : {
            model : version,
            as : 'Versiones',
            include : {
                model : sucursal,
                as : 'Sucursales'
            }
        }
    })
    .then(response => {

        var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(response, 100)[page]) )

        datos(1).then(response => res.status(200).jsonp(response))

        const generador = {
            [Symbol.asyncIterator]: async function* () {

                let
                    page = 0,
                    cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){
                        yield await descuento.create({cantidad : _.random(10, 40), status : true, IdPromo : 1 })
                        .then(descuento =>
                            Promise.all( n.Versiones.map(async (version) =>
                                await Promise.all(
                                    version.Sucursales.map(async (sucursal) =>
                                        await sucursal.inventarios.addDescuentos(descuento.id))))))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){
            for await ( const item of generador[ Symbol.asyncIterator ]() ){
                // console.log(color)
            }
        })()

    })
    // .then(productos => Promise.all(
    //     productos.map(async (n) => new Object({
    //             producto : n,
    //             versiones : await n.getVersiones()
    //         }))))


}


ex.preciosejemplo = (req, res, next) => {

    inventario.findAll({
        order : ['IdVersion']
    })
    .then(response => {

        const items = Object.entries(_.groupBy(response, (x) => x.IdVersion )).map(n => new Object({ version : Number(n[0]), inventarios : n[1]  }))

        var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 10)[page]) )

        // datos(1).then(response => res.status(200).jsonp(response))

        const generador = {
            [Symbol.asyncIterator]: async function* () {

                let
                    page = 0,
                    cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        yield await precio.create({cantidad : _.random(0, 100), status : true })
                        .then(precio =>
                            Promise.all( n.inventarios.map(async (n) =>
                                n.addPrecios(precio.id))))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){
            for await (const item of generador[ Symbol.asyncIterator ]() ){
                // console.log(color)
            }
        })()

    })

}


ex.versiones = (req, res, next) => {

    // producto.findAll({where : {status : 1}, include : { model : version, as : 'Versiones' }})
    // .then(productos => _.flatten(productos.map(n => n.Versiones)))
    // .then(versiones =>
    //     versiones.filter(version =>
    //          !_.isNull(version.nombre) ? version.nombre.search('1A') > -1 ? version : null : null ))
    // .then(versiones => Promise.all(versiones.map(async (version)  => await version.addOpciones(93))))
    // .then(response => res.status(200).jsonp(response))

    opcion.findById(94)
    .then(response => response.getVersiones())
    .then(versiones => Promise.all(versiones.map(async(n) => n.update({status : 0 }))))

}



ex.productospromo = (req, res, next) => {

    // disponible.findAll()
    // .then(response => response.map(n => n.update({oferta : 0, descuento : 1})))

    // descuento.findAll({
    //     include : [
    //         {
    //             model : inventario,
    //             as : 'Inventarios',
    //             include : [
    //                 {
    //                     model : version,
    //                     as : 'Versiones'
    //                 }
    //             ]
    //         }
    //     ]
    // })
    // .then(response => response.map(n => new Object({
    //     promo : n.IdPromo,
    //     producto : _.uniq(n.Inventarios.map(n => n.Versiones. IdProducto))[0]
    // })))
    // .then(response => response.forEach(n => producto.findById(n.producto).then(producto => producto.addPromo(n.promo))))

}


ex.productosdescontinuados = (req, res, next) => {

    marca.findAll({ where : { status : [ 0, null ] }})
    .then(response => Promise.all(
        response.map(async (n) => await n.getProductos())
    ))
    .then(response => _.flatten(response))
    .then(response => response.map(n => n.update({status : 6})))
    .then(result => res.status(200).jsonp(result))

}


ex.cambiarstatusproductos = (req, res, next) => {

    producto.findAll({ where : { status : [ 1 ] }})
    .then(response => Promise.all(
        response.map(async (n) => await n.getProductos())
    ))
    .then(response => _.flatten(response))
    .then(response => response.map(n => n.update({status : 2})))
    .then(result => res.status(200).jsonp(result))

}

ex.versionesnulas = (req, res, next) => {

    categoria.findAll(
    //     { where : { nombre : null },
    //     include : [
    //         { model : sucursal,
    //          as : 'Sucursales'
    //      }
    //     ]
    // }
    )
    .then(response => response.forEach(n => n.update({status : 1})))
    .then(result => res.status(200).jsonp(result))

}


ex.imagenes = (req, res, next) => {

    var modelo = {
        servicio : portada,
        nombre : 'portadas'
    }

    modelo.servicio.findAll({
        where : {
            link : null
        }
    })
    .then(items => {

        // res.status(200).jsonp(items)

        console.log(items.length)

        var datos = (page) => new Promise((resolve, reject) => resolve(_.chunk(items, 10)[page]) )

        const generador = {
            [Symbol.asyncIterator]: async function* () {

                let
                    page = 0,
                    cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        var temp = modelo.nombre + '/' + n.id + '.jpg'

                        console.log(n.id)

                        yield fs.writeFile(temp, n.imagen.replace(/^data:image\/png;base64,/,""), { encoding: 'base64' }, function(err) {} )

                        var fileStream = fs.createReadStream(temp)

                        yield s3.upload({
                            Bucket: 'azulejos-' + modelo.nombre,
                            Key: n.id + '.jpg',
                            Body: fileStream
                        }, function(err, data) {

                            console.log(data)

                            if(!_.isUndefined(data))
                                n.update({link : data.Location})

                            console.log(err)
                        });
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){
            for await (const item of generador[ Symbol.asyncIterator ]() ){
            }
        })()
    })
}

ex.bucket = (req, res, next) => {

    var modelo = {
        servicio : portada,
        nombre : 'portadas'
    }

    modelo.servicio.findAll({
        atributtes : ['id']
    })
    .then(items => {

        items.forEach(n => n.update({link : null}))

        res.status(200).jsonp(s3)

        s3.listObjects({
           Bucket : 'azulejos-' + modelo.nombre,
           EncodingType: 'url',
       }, function(err, objetos) {

           console.log(err)
           console.log(objetos.Contents.length)

            items.forEach(item => {

                let algo = objetos.Contents.find(n => {
                    return Number(n.Key.replace(".jpg", "", "gi")) === item.id
                })

                if(!_.isUndefined(algo)){
                    console.log(algo)
                    // s3.getUrl({
                    //    Bucket : 'azulejos-' + modelo.nombre,
                    //    Key : algo.Key
                    // }, function(err, data) {
                    //     console.log(err)
                    //     console.log(data)        // successful response
                    // })
                }
            })

        });


    })



}
