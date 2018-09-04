const _ = require('lodash');
var fb  = require("firebird");
var sys = require("util");
const db = require('../relaciones');
const db1 = require('../../http/relaciones');
var { tabla, base, row } = db;
var { sucursal, producto, version, marca, inventario, existencia } = db1;

var ex = module.exports = {};


ex.crearExistencias = (req, res, next) => {

    sucursal.findAll({where : {status : 1}})
    .then(response => Promise.all(
        response.map(async(n) =>
            new Object({
                sucursal : n,
                base : await base.findOne({where : { nombre : n.nombre }})
    }))))
    .then(response => Promise.all(
        response.map(async(n) => {
            var con = fb.createConnection();
            con.connectSync('./firebird/' + n.base.url ,'SYSDBA','masterkey','');
            var clave = n.base.clave.toString().length === 1 ? '0' + n.base.clave : n.base.clave
            var result = await con.querySync("SELECT * FROM INVE" + clave ).fetchSync("all",true)

            return Promise.all(result.map( async (n) =>  [ n.CVE_ART, n.EXIST ] ))
        })
    ))
    .then(response => {


        const datos = (page) =>  new Promise(resolve => resolve( _.chunk(_.flatten(response), 10)[page] ))

        datos(1).then(response => res.status(200).jsonp(response))

        const productos = {
            [Symbol.asyncIterator]: async function* () {

                let page = 0
                let cache = null

                while(!_.isNull(cache) || page === 0) {

                    cache = await datos(page)

                    for (const n of cache){

                        if(n[1] > 0)
                            yield await inventario.findOne({ where : { clave : n[0]}})
                            .then(i => {
                                if(!_.isNull(i))
                                    existencia.create({ cantidad : n[1] })
                                    .then(e => e.addInventarios(i.id))
                            })

                    }

                    page = page + 1

                }
            }
        }

        ;(async function(){

            for await (const producto of productos[ Symbol.asyncIterator ]() ){

            }

        })()




    })


}
