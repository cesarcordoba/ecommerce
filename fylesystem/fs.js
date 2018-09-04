var fs = require("fs");

var modelos = [
    {   nombre : 'Productos',    singular : 'producto',      plural : 'productos'},
    {   nombre : 'Gamas',        singular : 'gama',      plural : 'gamas'},
    {   nombre : 'Lineas',        singular : 'linea',      plural : 'lineas'},
    {   nombre : 'Categorias',   singular : 'categoria',      plural : 'categorias'},
    {   nombre : 'Opciones',   singular : 'opcion',      plural : 'opciones'},
    {   nombre : 'Atributos',   singular : 'atributo',      plural : 'atributos'},
    {   nombre : 'Tipos',   singular : 'tipo',      plural : 'tipos'},
    {   nombre : 'Marcas',   singular : 'marca',      plural : 'marcas'},
    {   nombre : 'Ambientes',   singular : 'ambiente',      plural : 'ambientes'},
    {   nombre : 'Sucursales',   singular : 'sucursal',      plural : 'sucursales'},
    {   nombre : 'Fotos',   singular : 'foto',      plural : 'fotos'},
    {   nombre : 'Promociones',   singular : 'promo',      plural : 'promos'},
    {   nombre : 'Imagenes',   singular : 'imagen',      plural : 'imagenes'},
    {   nombre : 'Portadas',   singular : 'portada',      plural : 'portadas'},
    {   nombre : 'Precios',   singular : 'precio',      plural : 'precios'},
    {   nombre : 'Favoritos',   singular : 'favorito',      plural : 'favoritos'},
    {   nombre : 'Tarjetas',   singular : 'tarjeta',      plural : 'tarjetas'},
    {   nombre : 'Usuarios',   singular : 'usuario',      plural : 'usuarios'},
    {   nombre : 'Avatares',   singular : 'avatar',      plural : 'avatares'},
    {   nombre : 'Direcciones',   singular : 'direccion',      plural : 'direcciones'},
    {   nombre : 'Transacciones',   singular : 'transaccion',      plural : 'transacciones'},
    {   nombre : 'Ordenes',   singular : 'orden',      plural : 'ordenes'},
    {   nombre : 'Status',   singular : 'status',      plural : 'statuses'},
    {   nombre : 'Facturas',   singular : 'factura',      plural : 'facturas'},
    {   nombre : 'Paquetes',          singular : 'paquete',      plural : 'paquetes'     },
    {   nombre : 'Existentes',        singular : 'existente',    plural : 'existentes'   },
    {   nombre : 'Inventarios',       singular : 'inventario',   plural : 'inventarios'  }
]

//
// fs.mkdirSync('http/controladores')
// fs.mkdirSync('http/modelos')
// fs.mkdirSync('http/rutas')

modelos.forEach(modelo => {

fs.createWriteStream("http/controladores/" + modelo.nombre  + ".js")
.write(
`const db = require('../relaciones');
var { ` + modelo.singular + ` } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => ` + modelo.singular + `.create(req.body)
    .then(response => res.status(200).jsonp(response))

ex.delete = (req, res, next) => ` + modelo.singular + `.findById(req.params.id)
    .then(` + modelo.singular + ` => ` + modelo.singular + `.destroy())
    .then(response => res.status(200).jsonp(response))

ex.update = (req, res, next) => ` + modelo.singular + `.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response))

ex.read =  (req, res, next) => req.params.id ?
    ` + modelo.singular + `.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    ` + modelo.singular + `.findAll()
    .then(response => res.status(200).jsonp(response))
`)

fs.createWriteStream("http/modelos/" + modelo.nombre  + ".js")
.write(
`module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('` + modelo.plural + `', {
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: '` + modelo.singular + `',
    		plural: '` + modelo.plural + `'
        }
	})

`)


fs.createWriteStream("http/rutas/" + modelo.nombre  + ".js")
.write(
`var route = require('express').Router();
var x = require('../controladores/` + modelo.nombre + `');

route.route('/data/` + modelo.singular + `')
        .get(x.read)
        .post(x.create);

route.route('/data/` + modelo.singular + `/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

`)

})

// var relaciones = fs.createWriteStream("http/relaciones.js")
//
// relaciones.write(
// `var conector = require('./conexion.js')`)
//
// modelos.forEach(modelo => {
//     relaciones.write(`var ` +  modelo.singular +`  = require('./modelos/` + modelo.nombre + `')(conector);`)
// })
//
// modelos.forEach(modelo => {
//     relaciones.write(`module.exports.` +  modelo.singular  + ` = ` +  modelo.singular + ';')
// })
//
// relaciones.end()
//
// var main = fs.createWriteStream("mainejemplo.js")
//
// modelos.forEach(modelo => {
//
//     main.write("app.use('/', require('./http/rutas/" +  modelo.nombre  + "'));")
//
// })
