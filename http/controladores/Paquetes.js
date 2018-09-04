const db = require('../relaciones');
var { paquete } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => paquete.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => paquete.findById(req.params.id)
    .then(paquete => paquete.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => paquete.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    paquete.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    paquete.findAll()
    .then(response => res.status(200).jsonp(response))
