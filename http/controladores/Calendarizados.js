const _ = require('lodash');

var schedule = require('node-schedule');
const db = require('../relaciones');
var { categoria, producto, version, inventario, precio, existencia } = db;


var ex = module.exports = {};

ex.sincronizarProductos = (req, res, next) => {

    version.findAll({include : [
        {
            model : inventario,
            as : 'Inventarios',
            include : [
                {
                    model : precio,
                    as : 'Precios'
                },
                {
                    model : existencia,
                    as : 'Existencias'
                }
            ]
        }
    ]})
    .then(response => response.map(n => new Object({
        id : n.id,
        nombre : n.nombre,
        inventario : n.Inventarios.map(n => {
            let precio = n.Precios.reduce((ac, v) => v.cantidad < ac ? v.cantidad : ac , 10000000 )
            console.log(precio)
            let existencia = n.Existencias.reduce((ac, v) => v.cantidad < ac ? v.cantidad : ac , 10000000 )
            console.log(existencia)
            return new Object({
                id : n.id,
                clave : n.clave,
                precios : precio !== 10000000 ? precio : 0,
                existencias : existencia !== 10000000 ? existencia : 0
            })
        }).reduce((ac, n) => new Object({
                precios : n.precios < ac.precios ? n.precios :  ac.precios ,
                existencias : n.existencias + ac.existencias
            })
        , {
            precios : 10000000,
            existencias : 0
        })
    })))
    .then(response => {

        const datos = (page) =>  new Promise(resolve => resolve( _.chunk(response, 1)[page] ))

        const productos = {
            [Symbol.asyncIterator]: async function* () {

                let page = 0
                let cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        yield await version.update({precio : n.inventario.precios, existencia :  n.inventario.existencias }, { where : { id : n.id } })

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
    .then(response => res.status(200).jsonp(response))

}



//
// let startTime = new Date(Date.now() + 5000);
// let endTime = new Date(startTime.getTime() + 5000);
//
// var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
//   console.log('Time for tea!');
// });
//
//
// var j = schedule.scheduleJob('* 0 * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });
//
