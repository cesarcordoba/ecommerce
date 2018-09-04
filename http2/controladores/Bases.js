const _ = require('lodash');
const db = require('../relaciones');
const db1 = require('../../http/relaciones');
var { base } = db;
var { sucursal } = db1;

var ex = module.exports = {};

ex.inicial = (req, res, next) => {
    /*
    var algo = [
        { url  :  'ori1/SAE70EMPRE01.FDB',   clave: 1, nombre : 'Orizaba' },
        { url  :  'cor1/SAE70EMPRE02.FDB',   clave: 2, nombre : 'Cordoba' },
        { url  :  'cor2/SAE70EMPRE03.FDB',   clave: 3, nombre : 'Cordoba2'},
        { url  :  'tuxte/SAE70EMPRE04.FDB',  clave: 4, nombre : 'Textu'   },
        { url  :  'tez1/SAE70EMPRE05.FDB',   clave: 5, nombre : 'Tez'     },
        { url  :  'tez2/SAE70EMPRE06.FDB',   clave: 6, nombre : 'Tez2'    },
        { url  :  'mart1/SAE70EMPRE07.FDB',  clave: 7, nombre : 'Martinez'},
        { url  :  'mart2/SAE70EMPRE08.FDB',  clave: 8, nombre : 'Martinez2'},
        { url  :  'ver1/SAE70EMPRE09.FDB',   clave: 9, nombre : 'Ver1'    },
        { url  :  'ver2/SAE70EMPRE10.FDB',   clave: 10, nombre : 'Ver2'   },
        { url  :  'ver3/SAE70EMPRE11.FDB',   clave: 11, nombre : 'Ver3'   }
    ].forEach((n, key) => {
        base.create(obj)
        sucursal.create(obj)
    })
    */
    base.create({ url:  'ferremar/SAE70Empre01.FDB', clave: 1, nombre : 'Ferremar' })
    sucursal.create({ url:  'ferremar/SAE70Empre01.FDB', clave: 1, nombre : 'Ferremar' })

}


ex.create = (req, res, next) => base.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => base.findById(req.params.id)
    .then(base => base.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => base.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    base.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    base.findAll()
    .then(response => res.status(200).jsonp(response))
