var conector = require('./conexion.js')

var producto = require('./modelos/Productos')(conector);
var gama = require('./modelos/Gamas')(conector);
var linea = require('./modelos/Lineas')(conector);
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
var paquete = require('./modelos/Paquetes')(conector);
var existencia = require('./modelos/Existencias')(conector);
var inventario = require('./modelos/Inventarios')(conector);
var version = require('./modelos/Versiones')(conector);
var set = require('./modelos/Sets')(conector);
var posicion = require('./modelos/Posiciones')(conector);
var observacion = require('./modelos/Observaciones')(conector);
var color = require('./modelos/Colores')(conector);
var descuento = require('./modelos/Descuentos')(conector);
var oferta = require('./modelos/Ofertas')(conector);

var entrante = require('./modelos/Entrantes')(conector);
var saliente = require('./modelos/Salientes')(conector);

var llaveSocial = require('./modelos/LlavesSocial')(conector);

var espacio = require('./modelos/Espacios')(conector);
var cuarto = require('./modelos/Cuartos')(conector);

var disponible = require('./modelos/Disponibles')(conector);


//Categoria


categoria.hasMany(categoria, { as : 'Subcategorias', foreignKey:'IdCategoria'});
categoria.belongsTo(categoria, { as : 'Categoria', foreignKey:'IdCategoria'});


//Marca

marca.hasMany(linea, { as : 'Linea', foreignKey:'IdMarca'});
linea.belongsTo(marca, { as : 'Marca', foreignKey:'IdMarca'});

marca.hasMany(gama, { as : 'Gama', foreignKey:'IdMarca'});
gama.belongsTo(marca, { as : 'Marca', foreignKey:'IdMarca'});

//Produto

gama.hasMany(producto, { as : 'Productos', foreignKey:'IdGama'});
producto.belongsTo(gama, { as : 'Gama', foreignKey:'IdGama'});

marca.hasMany(producto, { as : 'Productos', foreignKey:'IdMarca'});
producto.belongsTo(marca, { as : 'Marca', foreignKey:'IdMarca'});

categoria.hasMany(producto, { as : 'Productos', foreignKey:'IdCategoria'});
producto.belongsTo(categoria, { as : 'Categoria', foreignKey:'IdCategoria'});

linea.hasMany(producto, { as : 'Productos', foreignKey:'IdLinea'});
producto.belongsTo(linea, { as : 'Linea', foreignKey:'IdLinea'});

ambiente.belongsToMany(producto, {as: 'Productos', through: posicion, foreignKey: 'IdAmbiente'})
producto.belongsToMany(ambiente, {as: 'Ambientes', through: posicion, foreignKey: 'IdProducto'})

ambiente.hasOne(espacio, { as : 'Espacio', foreignKey:'IdAmbiente'});
espacio.belongsTo(ambiente, { as : 'Ambiente', foreignKey:'IdAmbiente'});

cuarto.hasMany(ambiente, { as : 'Ambientes', foreignKey:'IdCuarto'});
ambiente.belongsTo(cuarto, { as : 'Cuarto', foreignKey:'IdCuarto'});


categoria.belongsToMany(atributo, {as: 'Atributos', through: 'categorias_atributos', foreignKey: 'IdCategoria'})
atributo.belongsToMany(categoria, {as: 'Categorias', through: 'categorias_atributos', foreignKey: 'IdAtributo'})

atributo.hasMany(opcion, {as: 'Opciones', foreignKey: 'IdAtributo'})
opcion.belongsTo(atributo, {as: 'Atributo', foreignKey: 'IdAtributo'})

version.belongsToMany(opcion, {as: 'Opciones', through: 'versiones_opciones', foreignKey: 'IdVersion'})
opcion.belongsToMany(version, {as: 'Versiones', through: 'versiones_opciones', foreignKey: 'IdOpcion'})

version.belongsTo(producto, { as : 'Producto', foreignKey:'IdProducto'});
producto.hasMany(version, { as : 'Versiones', foreignKey:'IdProducto'});

color.belongsToMany(version, {as: 'Versiones', through: 'versiones_colores', foreignKey: 'IdColor'})
version.belongsToMany(color, {as: 'Colores', through: 'versiones_colores', foreignKey: 'IdVersion'})

portada.belongsTo(producto, { as : 'Producto', foreignKey:'IdProducto'});
producto.hasOne(portada, { as : 'Portada', foreignKey:'IdProducto'});

imagen.belongsTo(producto, { as : 'Producto', foreignKey:'IdProducto'});
producto.hasMany(imagen, { as : 'Imagenes', foreignKey:'IdProducto'});

observacion.belongsTo(producto, { as : 'Producto', foreignKey:'IdProducto'});
producto.hasMany(observacion, { as : 'Observaciones', foreignKey:'IdProducto'});

//Precios y sucursales

foto.belongsTo(sucursal, { as : 'Sucursal', foreignKey:'IdSucursal'});
sucursal.hasMany(foto, { as : 'Fotos', foreignKey:'IdSucursal'});

version.belongsToMany(sucursal, {as: 'Sucursales', through: inventario, foreignKey: 'IdVersion'})
sucursal.belongsToMany(version, {as: 'Versiones', through: inventario,  foreignKey: 'IdSucursal'})


inventario.belongsTo(version, { as : 'Version', foreignKey: 'IdVersion'});
version.hasMany(inventario, { as : 'Inventarios', foreignKey: 'IdVersion'});

inventario.belongsTo(tipo, { as : 'Tipo', foreignKey: 'IdTipo'});
tipo.hasMany(inventario, { as : 'Inventarios', foreignKey: 'IdTipo'});

inventario.belongsToMany(precio, {as: 'Precios', through: 'inventarios_precios', foreignKey: 'IdInventario'})
precio.belongsToMany(inventario, {as: 'Inventarios', through: 'inventarios_precios', foreignKey: 'IdPrecio'})

// Estructura de promo

version.belongsToMany(descuento, {as: 'Descuentos', through: 'versiones_descuento', foreignKey: 'IdVersion'})
descuento.belongsToMany(version, {as: 'Versiones', through: 'versiones_descuento', foreignKey: 'IdDescuento'})

producto.belongsToMany(promo, {as: 'Promos', through: disponible , foreignKey: 'IdProducto'})
promo.belongsToMany(producto, {as: 'Productos', through: disponible , foreignKey: 'IdPromo'})

descuento.belongsTo(promo, { as : 'Promo', foreignKey:'IdPromo'});
promo.hasMany(descuento, { as : 'Descuentos', foreignKey:'IdPromo'});

oferta.belongsTo(promo, { as : 'Promo', foreignKey:'IdPromo'});
promo.hasMany(oferta, { as : 'Ofertas', foreignKey:'IdPromo'});

version.belongsToMany(oferta, {as: 'Entrantes', through: entrante , foreignKey: 'IdVersion'})
oferta.belongsToMany(version, {as: 'Entrantes', through: entrante, foreignKey: 'IdOferta'})

version.belongsToMany(oferta, {as: 'Salientes', through: saliente , foreignKey: 'IdVersion'})
oferta.belongsToMany(version, {as: 'Salientes', through: saliente , foreignKey: 'IdOferta'})

//Transacciones y Ordenes

transaccion.belongsTo(version, { as : 'Version', foreignKey:'IdVersion'});
version.hasMany(transaccion, { as : 'Transacciones', foreignKey:'IdVersion'});

transaccion.belongsTo(precio, { as : 'Precio', foreignKey:'IdPrecio'});
precio.hasMany(transaccion, { as : 'Transacciones', foreignKey:'IdPrecio'});

transaccion.belongsTo(promo, { as : 'Promo', foreignKey:'IdPromo'});
promo.hasMany(transaccion, { as : 'Transacciones', foreignKey:'IdPromo'});

transaccion.belongsTo(orden, { as : 'Orden', foreignKey:'IdOrden'});
orden.hasMany(transaccion, { as : 'Transacciones', foreignKey:'IdOrden'});

//Existencias

orden.belongsTo(status, { as : 'Status', foreignKey:'IdStatus'});
status.hasMany(orden, { as : 'Ordenes', foreignKey:'IdStatus'});

paquete.belongsTo(orden, { as : 'Orden', foreignKey:'IdOrden'});
orden.hasMany(paquete, { as : 'Paquetes', foreignKey:'IdOrden'});

inventario.belongsToMany(existencia, {as: 'Existencias', through: 'inventarios_existencia', foreignKey: 'IdInventario'})
existencia.belongsToMany(inventario, {as: 'Inventarios', through: 'inventarios_existencia', foreignKey: 'IdExistencia'})

// existente.belongsTo(paquete, { as : 'Paquete', foreignKey:'IdPaquete'});
// paquete.hasMany(existente, { as : 'Existentes', foreignKey:'IdPaquete'});

factura.belongsTo(orden, { as : 'Orden', foreignKey:'IdOrden'});
orden.hasOne(factura, { as : 'Factura', foreignKey:'IdOrden'});

//-  Usuarios

usuario.belongsToMany(version, {as: 'Versiones', through: favorito, foreignKey: 'IdUsuario'})
version.belongsToMany(usuario, {as: 'Usuarios', through: favorito, foreignKey: 'IdVersion'})

usuario.belongsTo(orden, { as : 'Orden', foreignKey:'IdOrden'});
orden.hasMany(usuario, { as : 'Usuarios', foreignKey:'IdOrden'});

// LLaves Sociales

usuario.hasOne(llaveSocial , {as: 'SocialKey', foreignKey: 'id_usuario'});
llaveSocial.belongsTo(usuario, {as: 'Usuario', foreignKey: 'id_usuario'});
llaveSocial.hasOne(avatar, {as: 'Avatar', foreignKey: 'social_key'});
avatar.belongsTo(llaveSocial , {as: 'SocialKey', foreignKey: 'social_key'});

module.exports = {
    producto,
    gama,
    paquete,
    existencia,
    inventario,
    categoria,
    opcion,
    atributo,
    tipo,
    marca,
    ambiente,
    sucursal,
    foto,
    promo,
    descuento,
    imagen,
    portada,
    precio,
    favorito,
    tarjeta,
    usuario,
    avatar,
    color,
    direccion,
    transaccion,
    orden,
    status,
    factura,
    version,
    linea,
    set,
    observacion,
    posicion,
    espacio,
    cuarto,
    oferta,
    saliente,
    entrante,
    disponible,
    llaveSocial
}
