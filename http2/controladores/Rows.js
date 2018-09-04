const _ = require('lodash');
var fb  = require("firebird");
var sys = require("util");
const db = require('../relaciones');
var { row, tabla, base } = db;

var ex = module.exports = {};

ex.inicial = (req, res, next) =>
    base.findAll({where : {clave : 1 }})
    .then(response => Promise.all(
            response.map(async (b) => {

                var con = fb.createConnection();
                con.connectSync('./firebird/' + b.url ,'SYSDBA','masterkey','');

                return new Object({
                    base : b.nombre,
                    tablas : await b.getTablas()
                    .then(tablas => new Object({
                            tabla : b.nombre,
                            rows: tablas.map((tabla) => {

                                var rows = con.querySync("select * from " + tabla.nombre).fetchSync("all",true)

                                return new Object({
                                        IdTabla : tabla.id,
                                        cantidad : rows.length
                                    })
                            })

                        }))
                })

            })
    )).then(response => response.forEach(base => {
        base.tablas.rows.forEach(row_ => {
            row.create(row_)
        })
    }))



ex.create = (req, res, next) => row.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => row.findById(req.params.id)
    .then(row => row.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => row.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    row.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    row.findAll()
    .then(response => res.status(200).jsonp(response))
