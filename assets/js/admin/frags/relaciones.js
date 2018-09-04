var conector = require('./conexion.js')

var producto = require('./modelos/Productos')(conector);
var gama = require('./modelos/Gamas')(conector);
var categoria = require('./modelos/Categorias')(conector);
var opcion = require('./modelos/Opciones')(conector);
var atributo = require('./modelos/Atributos')(conector);
var tipo = require('./modelos/Tipos')(conector);
var marca = require('./modelos/Marcas')(conector);
var ambiente = require('./modelos/Ambientes')(conector);
var sucursal = require('./modelos/Sucursales')(conector);
var foto = require('./modelos/Fotos')(conector);
var promo = require('./modelos/Promociones')(conector);
var imagen = require('./modelos/Imagenes')(conector);
var portada = require('./modelos/Portadas')(conector);
var precio = require('./modelos/Precios')(conector);
var favorito = require('./modelos/Favoritos')(conector);
var tarjeta = require('./modelos/Tarjetas')(conector);
var usuario = require('./modelos/Usuarios')(conector);
var avatar = require('./modelos/Avatares')(conector);
var direccion = require('./modelos/Direcciones')(conector);
var transaccion = require('./modelos/Transacciones')(conector);
var orden = require('./modelos/Ordenes')(conector);
var status = require('./modelos/Status')(conector);
var factura = require('./modelos/Facturas')(conector);

module.exports.producto = producto;
module.exports.gama = gama;
module.exports.categoria = categoria;
module.exports.opcion = opcion;
module.exports.atributo = atributo;
module.exports.tipo = tipo;
module.exports.marca = marca;
module.exports.ambiente = ambiente;
module.exports.sucursal = sucursal;
module.exports.foto = foto;
module.exports.promo = promo;
module.exports.imagen = imagen;
module.exports.portada = portada;
module.exports.precio = precio;
module.exports.favorito = favorito;
module.exports.tarjeta = tarjeta;
module.exports.usuario = usuario;
module.exports.avatar = avatar;
module.exports.direccion = direccion;
module.exports.transaccion = transaccion;
module.exports.orden = orden;
module.exports.status = status;
module.exports.factura = factura;
