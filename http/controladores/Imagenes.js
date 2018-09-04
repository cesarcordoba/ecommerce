const AWS = require('aws-sdk');
var fs = require("fs");
var _ = require("lodash");
const db = require('../relaciones');
var { imagen } = db;

var ex = module.exports = {};

var s3 = new AWS.S3({
    accessKeyId: 'AKIAJ276W32MFP73B22A',
    secretAccessKey: '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'
})

ex.create = (req, res, next) => imagen.create(req.body)
	.then(imagencita => s3.upload({
		Bucket: 'azulejos-imagenes',
		Key: imagencita.id + '.jpg',
		Body: new Buffer(req.body.imagen.replace(/^data:image\/\w+;base64,/, ""),'base64'),
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg',
        ACL : 'public-read'
	}, function(err, data) {
		return imagencita.update({link : data.Location})
	}))
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => imagen.findById(req.params.id)
    .then(imagen => imagen.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => imagen.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    imagen.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    imagen.findAll()
    .then(response => res.status(200).jsonp(response))
