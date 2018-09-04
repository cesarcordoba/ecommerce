const _ = require('lodash');
var fb = require('firebird');
var sys = require("util");

var fs = require('fs');


var Firebird = require('node-firebird');

const db = require('../relaciones');

var ex = module.exports = {};

ex.obtener = (req, res, next) => {

    console.log(req.body)

    var peticion =  "select * from " + req.body.tabla + (!_.isUndefined(req.body.searching) ?
        ' WHERE ' +  req.body.searching.atributo + " = '"  + req.body.searching[req.body.searching.atributo] + "'" : '')

    var con = fb.createConnection();

    con.connectSync('./firebird/' + req.body.url ,'SYSDBA','masterkey','');
    var rows = con.querySync( peticion ).fetchSync("all",true);

    res.status(200).jsonp(new Object({
        items : _.chunk(rows, req.body.paginacion.limite)[req.body.paginacion.pagina - 1],
        paginas : Math.round(rows.length / req.body.paginacion.limite)
    }))

}

ex.tablas = (req, res, next) => {

    console.log(req.body)

    var con = fb.createConnection();
    con.connectSync('./firebird/' + req.body.url ,'SYSDBA','masterkey','');
    var rows = con.querySync("SELECT * FROM rdb$relations").fetchSync("all",true);
    res.status(200).jsonp(rows)

}

ex.nuevaconexion = (req, res, next) => {



    var options = {};

    options.host = '127.0.0.1';
    options.port = 3050;
    options.database = './firebird/ver1/SAE70EMPRE09.FDB';
    options.user = 'sysdba';
    options.password = 'masterkey';

    var con = fb.createConnection();
    con.connectSync(options.database,options.user,options.password,'')

    // Firebird.attach(options, function(err, db) {
    //
    //     if (err)
    //         throw err;
    //
    //     // db = DATABASE
    //     db.query('SELECT * FROM CAMP09', function(err, result) {
    //         console.log(result)
    //         // IMPORTANT: close the connection
    //         db.detach();
    //     });
    //
    // })

    Firebird.create(options, function(err, db) {

        console.log(db)

        if (err)
            throw err;


    });

}
