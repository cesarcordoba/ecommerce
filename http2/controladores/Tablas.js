const _ = require('lodash');
var fb  = require("firebird");
var sys = require("util");
const db = require('../relaciones');
const db1 = require('../../http/relaciones');
var { tabla, base, row } = db;
var { sucursal, producto, version, marca } = db1;

var ex = module.exports = {};

ex.inicial = (req, res, next) => {

    base.findAll()
    .then(response => {

        response.map(x => {

            var con = fb.createConnection();
            con.connectSync('./firebird/' + x.url ,'SYSDBA','masterkey','');
            var rows = con.querySync("SELECT * FROM rdb$relations").fetchSync("all",true);
            var algo = rows.map(n =>
                    n.RDB$RELATION_NAME.charAt(3) !== '$' ? n.RDB$RELATION_NAME : null
            ).filter(n => !_.isNull(n)).forEach(n => tabla.create({ nombre : n, IdBase : x.id}))

        })

    })

}

ex.sincronizar = (req, res, next) => {

    sucursal.findAll()
    .then(response =>
        Promise.all(
            response.map(async (s) =>
                new Object({
                    sucursal : s,
                    base : await base.findOne({where : { clave : s.clave }})
            })
        )))
    .then(response =>
        Promise.all(
            response.map(async (s) => {

                var clave = s.sucursal.clave.toString().length === 1 ? '0' + s.sucursal.clave : s.sucursal.clave
                var con = fb.createConnection();
                con.connectSync('./firebird/' + s.base.url ,'SYSDBA','masterkey','');

                return new Object({
                    sucursal : s,
                    objeto : await con.querySync("SELECT * FROM INVE" + clave ).fetchSync("all",true)
                })
        })))
    .then((response) => _.flatten(_.flatten(response.map(s =>
            s.objeto.map(n =>
                new Object({ sucursal : s.sucursal.sucursal.id , nombre : n.DESCR, clave : n.CVE_ART, linea : n.LIN_PROD })))))
    )
    .then(response => {

        const datos = (page) =>  new Promise(resolve => resolve( _.chunk(response, 100)[page] ))

        const productos = {
            [Symbol.asyncIterator]: async function* () {

                let page = 0
                let cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)
                    for (const n of cache){
                        yield await version.findOrCreate({ where : { nombre : n.nombre }, defaults: { linea : n.linea  }})
                        .spread((version , status) => Promise.all([
                            version.addSucursales(n.sucursal , { through: { clave : n.clave } }),
                            marca.findOrCreate({ where : { clave :  n.linea } })
                        ]))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){

            for await (const producto of productos[ Symbol.asyncIterator ]() ){
                console.log(producto)
            }

        })()


    })
}

ex.separar = (req, res, next) => {

    version.findAll()
    .then(response => {

        const
            productos = [],
            versiones = response
        var idx = 0

        versiones.forEach(v => {

            function item(){
                productos.push(new Object({
                    nombre : v.nombre,
                    versiones : []
                }))
            }

            if(_.isUndefined(productos[idx]))
                item()

            // let result = productos[idx].versiones.reduce((ac, p) => {

            var
                producto = _.words(productos[idx].nombre ),
                version =  _.words(v.nombre),
                status = true

            var coleccion = version.reduce((ac, v, key) => {

                let result = producto.reduce((ac, p) => {

                    return v === p ? p : ac

                }, '')

                if(result.length === 0)
                    status = false

                if(status)
                    return  !_.isNull( result ) ? ( ac + ' ' + result ) : ac
                if(!status)
                    return ac

            }, '')

            if(coleccion.length > 0)
                productos[idx].nombre = coleccion,
                productos[idx].versiones.push(  v  )
            else
                item(),
                idx++,
                productos[idx].versiones.push(  v  )

        })

        return productos

    })
    .then(response => {


        const datos = (page) =>  new Promise(resolve => resolve( _.chunk(response, 1)[page] ))

        const productos = {
            [Symbol.asyncIterator]: async function* () {

                let page = 0
                let cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        yield await producto.findOrCreate({where : {nombre : n.nombre, status : 0}})
                        .spread((response, status) => Promise.all(
                            n.versiones.map(async (v) => await response.addVersiones(v.id))))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){

            for await (const producto of productos[ Symbol.asyncIterator ]() ){
                console.log(producto)
            }

        })()


        // const productos = response
        //
        // Promise.all(productos.map(async(n) =>
        //
        //     await producto.findOrCreate({where : {nombre : n.nombre, status : 0}})
        //     .spread((response, status) => Promise.all(
        //         n.versiones.map(async (v) =>
        //             await response.addVersiones(v.id)
        // )))

    })

}

ex.numeros = (req, res, next) => {

    function cambio(x){

        let palabras = x.split(' ')
        let numero = palabras.shift()

        if(palabras[0] === 'X')
            numero = numero + palabras.shift(),
            numero = numero + palabras.shift()

        let juntos = palabras.join(' ')

        return juntos + ' ' + numero

    }

    version.findAll({ where :
            { nombre : {$or  : [
                { $like : '1%' }, { $like : '2%' }, { $like : '3%' }, { $like : '4%' }, { $like : '5%' }, { $like : '6%' }
            ]}
        }
    })
    .then(response => response.map(n => n.get({plan : true})))
    .then(response => response.reverse().map(n => Object.assign(n, {nombre : cambio(n.nombre)})).filter(n => n.linea !== 'AQUAS'))
    .then(response => Promise.all(
        response.map(async(n) => await version.update(n, {where : {id : n.id } } )
    )))
    .then(response => res.status(200).jsonp(response))

}

ex.marcas = (req, res, next) => {

    producto.findAll({
        include : [
            {
                model : version,
                as : 'Versiones'
            }
        ]
    })
    .then(response => {

        const datos = (page) =>  new Promise(resolve => resolve( _.chunk(response, 1)[page] ))

        const productos = {
            [Symbol.asyncIterator]: async function* () {

                let page = 0
                let cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        yield await marca.findOrCreate({ where : { clave : n.Versiones[0].linea } })
                        .spread((marca, status) => marca.addProductos(n.id))
                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){

            for await (const producto of productos[ Symbol.asyncIterator ]() ){
                console.log(producto)
            }

        })()

    })

}


ex.tablaXbase = (req, res, next) =>
    base.findById( req.params.id )
    .then(basesita => basesita.getTablas())
    .then(response => res.status(200).jsonp(response))

ex.cantidad = (req, res, next) => {

    console.log(req.params.id)


    row.findAll({where : { IdTabla :  req.params.id }})
    .then(response => {

        let [ head, ...tail ] = response.reverse()

        res.status(200).jsonp( !_.isUndefined(head) ?  Number(head.cantidad) : null)

    })
}

ex.categorias = (req, res, next) => {

    var categorias = [
        {
            n: 'materiales electricos',
            h: [
                {n: 'focos y lamparas',
                    h: [
                        {n: 'focos'},
                        {n: 'lamparas'}
                    ]
                },
                {n: 'cables'},
                {n: 'chalupas'},
                {n: 'cajas de registro'},
                {n: 'placas'},
                {n: 'poliductos y poliflex'},
                {n: 'bases de medidor'},
                {n: 'varilla de cooperwell'},
                {n: 'conector para varilla'},
                {n: 'interruptores'},
                {n: 'mufia'},
                {n: 'centro de carga'},
                {n: 'soquets'},
                {n: 'cintas de aislar'}

            ]
        },
        {
            n: 'aceros',
            h:[
                {n: 'varillas'},
                {n: 'alambre recocido'},
                {n: 'alambron'},
                {n: 'castillos'},
                {n: 'cadenas'},
                {n: 'clavos'},
                {n: 'mallas',
                    h:[
                        {n: 'pisos'},
                        {n: 'techo'},
                        {n: 'ciclon'},
                        {n: 'hexagonal'},
                        {n: 'ganadera'}
                    ]
                },
                {n: 'alambre de puas'}
            ]
        },
        {
            n: 'pisos'
        },
        {
            n: 'azulejos',
            h:[
                {n: 'azulejos'},
                {n: 'decorados',
                    h:[
                        {n: 'decorado'},
                        {n: 'inserto'},
                        {n: 'cenefa'},
                        {n: 'malla decorada'},
                        {n: 'uniperfil'}
                    ]
                }
            ]
        },
        {
            n: 'tinacos',
            h:[
                {n: 'tinacos'},
                {n: 'cisterna'}
            ]
        },
        {
            n: 'cisternas'
        },
        {
            n: 'pvc',
            h:[
                {n: 'pvc',
                    h:[
                        {n: 'tubo'},
                        {n: 'conexiones'}
                    ]
                },
                {n: 'cpvc',
                    h:[
                        {n: 'tubo'},
                        {n: 'conexiones'}
                    ]
                },
                {n: 'tubo plus',
                    h:[
                        {n: 'tubo'},
                        {n: 'conexiones'}
                    ]
                },
                {n: 'hidraulico',
                    h:[
                        {n: 'tubo'},
                        {n: 'conexiones'}
                    ]
                }
            ]
        },
        {
            n: 'herramientas',
            h: [
                {n: 'escaleras'},
                {n: 'cinceles'},
                {n: 'cavadores'},
                {n: 'martillos'},
                {n: 'llaves'},
                {n: 'marros'},
                {n: 'accesorios'},
                {n: 'brocas'},
                {n: 'discos'},
                {n: 'palas y picos'},
                {n: 'rastrillos'},
                {n: 'tijeras'},
                {n: 'pinzas'},
                {n: 'multimetros'},
                {n: 'gatos'},
                {n: 'hachas'},
                {n: 'seguridad',
                    h:[
                        {n: 'lentes'},
                        {n: 'cascos'},
                        {n: 'impermeables'},
                        {n: 'tapones auditivos'},
                        {n: 'mascarillas'}
                    ]
                }
            ]
        },
        {
            n: 'paneles'
        },
        {
            n: 'mangueras'
        },
        {
            n: 'puertas y ventanas'
        },
        {
            n: 'tornilleria',
            h:[
                {n: 'birlos'},
                {n: 'tuercas'},
                {n: 'tornillos'},
                {n: 'pijas'},
                {n: 'esparragos'},
                {n: 'arandela'}
            ]
        },
        {
            n: 'bombas'
        },
        {
            n: 'lamina',
            h:[
                {n: 'zintro alum'},
                {n: 'galvanizada'},
                {n: 'galvateja'},
                {n: 'poliacrilica'},
                {n: 'de fibra'},
                {n: 'opaca'}
            ]
        },
        {
            n: 'fierro comercial'
        },
        {
            n: 'griferia',
            h:[
                {n:'metalicas'},
                {n:'pvc'}
            ]
        },
        {
            n: 'muebles de baño',
            h:[
                {n: 'juegos de baño'},
                {n: 'gabinetes'},
                {n: 'asientos de inodoro'},
                {n: 'espejos'},
                {n: 'ovalines'},
                {n: 'migitorios'}
            ]
        },
        {
            n: 'materiales de construccion',
            h:[
                {n: 'polvos',
                    h:[
                        {n: 'cemento'},
                        {n: 'cal'},
                        {n: 'mortero'},
                        {n: 'boquilla'},
                        {n: 'mixtecal'},
                        {n: 'yeso'}
                    ]
                },
                {n: 'tubos de carton'},
                {n: 'calidra'},
                {n: 'nixtacal'},
                {n: 'tabique aparante'},
                {n: 'celocias'},
                {n: 'vitroblock'},
                {n: 'block'},
                {n: 'yeso'},
                {n: 'pega azulejos'},
                {n: 'junteador'}

            ]
        }

    ]

    var idx = 0


    function imprimir(array){

        console.log(array)

        idx++
        console.log(idx)


        array.forEach(n => {

            console.log(!_.isUndefined(n.h))

            if(!_.isUndefined(n.h))


                imprimir(n.h)
            })



    }

    imprimir(categorias)

    res.status(200).jsonp(categorias)
}

ex.create = (req, res, next) => tabla.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => tabla.findById(req.params.id)
    .then(tabla => tabla.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => tabla.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    tabla.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    tabla.findAll()
    .then(response => res.status(200).jsonp(response))
