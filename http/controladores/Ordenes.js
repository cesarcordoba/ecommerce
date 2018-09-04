const db = require('../relaciones');
var Openpay = require('openpay');
var openpay = new Openpay('m5zjhjbrhxcvutm3mqmx', 'sk_7d149dae2ca04bc5ba9d374a65045348');
var { orden } = db;

openpay.setMerchantId('m5zjhjbrhxcvutm3mqmx');
openpay.setPrivateKey('sk_7d149dae2ca04bc5ba9d374a65045348');
openpay.setProductionReady(false);

var ex = module.exports = {};

ex.create = (req, res, next) => orden.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => orden.findById(req.params.id)
    .then(orden => orden.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => orden.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    orden.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    orden.findAll()
    .then(response => res.status(200).jsonp(response))

ex.pagos = (req, res, next) =>
    openpay.charges.create(req.body, function (error, body){
        console.log(body)
        if(body){
            // let ordensita = {
            //     status : body.status,
            //     fechaCompra: body.operation_date
            // }

            orden.create( {idTransaccionOpenpay: body.id} ).then(response => res.status(200).jsonp(response))
        }

        if(error) {
            console.log(error)
            res.status(200).jsonp({error_code: error.error_code})
        }
});
