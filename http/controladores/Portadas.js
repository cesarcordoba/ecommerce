const AWS = require('aws-sdk');
var fs = require("fs");
var _ = require("lodash");
const db = require('../relaciones');
var { portada } = db;

var ex = module.exports = {};

var s3 = new AWS.S3({
    accessKeyId: 'AKIAJ276W32MFP73B22A',
    secretAccessKey: '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'
})

ex.create = (req, res, next) => portada.findOrCreate({ where : { IdProducto : req.body.IdProducto}})
    .spread((portadita , status) => {

        // var temp = './temp/nuevo.jpg'
        //
        // fs.writeFile(temp, req.body.imagen.replace(/^data:image\/png;base64,/,""), { encoding: 'base64' }, function(err) {} )
        //
        // var fileStream = fs.createReadStream(temp)

        console.log(portadita.id)
        return s3.upload({
            Bucket: 'azulejos-portadas',
            Key: portadita.id + '.jpg',
            Body: new Buffer(req.body.imagen.replace(/^data:image\/\w+;base64,/, ""),'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            ACL : 'public-read'
        }, function(err, data) {
            console.log(err)
            console.log(data)
            return portadita.update({link : data.Location})
        })
    })
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => portada.findById(req.params.id)
    .then(portada => portada.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => portada.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    portada.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    portada.findAll()
    .then(response => res.status(200).jsonp(response))

ex.portadaXproducto = (req, res, next) =>
    portada.findOne({ where: { IdProducto: req.params.id } })
    .then(response => res.status(200).jsonp(response))
