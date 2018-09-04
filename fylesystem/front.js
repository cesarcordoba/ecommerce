var fs = require("fs");

var modelos = [
    {   servicio : 'Producto', nombre : 'Productos',    singular : 'producto',      plural : 'productos'},
    {   servicio : 'Gama', nombre : 'Gamas',        singular : 'gama',      plural : 'gamas'},
    {   servicio : 'Linea', nombre : 'Lineas',        singular : 'linea',      plural : 'lineas'},
    {   servicio : 'Categoria', nombre : 'Categorias',   singular : 'categoria',      plural : 'categorias'},
    {   servicio : 'Opcion', nombre : 'Opciones',   singular : 'opcion',      plural : 'opciones'},
    {   servicio : 'Atributo', nombre : 'Atributos',   singular : 'atributo',      plural : 'atributos'},
    {   servicio : 'Tipo', nombre : 'Tipos',   singular : 'tipo',      plural : 'tipos'},
    {   servicio : 'Marca', nombre : 'Marcas',   singular : 'marca',      plural : 'marcas'},
    {   servicio : 'Ambiente', nombre : 'Ambientes',   singular : 'ambiente',      plural : 'ambientes'},
    {   servicio : 'Sucursal', nombre : 'Sucursales',   singular : 'sucursal',      plural : 'sucursales'},
    {   servicio : 'Foto', nombre : 'Fotos',   singular : 'foto',      plural : 'fotos'},
    {   servicio : 'Promocion', nombre : 'Promociones',   singular : 'promo',      plural : 'promos'},
    {   servicio : 'Imagen', nombre : 'Imagenes',   singular : 'imagen',      plural : 'imagenes'},
    {   servicio : 'Portada', nombre : 'Portadas',   singular : 'portada',      plural : 'portadas'},
    {   servicio : 'Precio', nombre : 'Precios',   singular : 'precio',      plural : 'precios'},
    {   servicio : 'Favorito', nombre : 'Favoritos',   singular : 'favorito',      plural : 'favoritos'},
    {   servicio : 'Tarjeta', nombre : 'Tarjetas',   singular : 'tarjeta',      plural : 'tarjetas'},
    {   servicio : 'Usuario', nombre : 'Usuarios',   singular : 'usuario',      plural : 'usuarios'},
    {   servicio : 'Avatar', nombre : 'Avatares',   singular : 'avatar',      plural : 'avatares'},
    {   servicio : 'Direccion', nombre : 'Direcciones',   singular : 'direccion',      plural : 'direcciones'},
    {   servicio : 'Transaccion', nombre : 'Transacciones',   singular : 'transaccion',      plural : 'transacciones'},
    {   servicio : 'Orden', nombre : 'Ordenes',   singular : 'orden',      plural : 'ordenes'},
    {   servicio : 'Status', nombre : 'Status',   singular : 'status',      plural : 'statuses'},
    {   servicio : 'Factura', nombre : 'Facturas',   singular : 'factura',      plural : 'facturas'},
    {   servicio : 'Paquete', nombre : 'Paquetes',          singular : 'paquete',      plural : 'paquetes'     },
    {   servicio : 'Existente', nombre : 'Existentes',        singular : 'existente',    plural : 'existentes'   },
    {   servicio : 'Inventario', nombre : 'Inventarios',       singular : 'inventario',   plural : 'inventarios'  }
]



var relaciones = fs.createWriteStream("servicios.js")

modelos.forEach(modelo =>
relaciones.write(
`
app.service('` + modelo.servicio +  `', function() {

    this.crear = ` + modelo.singular +  ` => axios.post('/data/` + modelo.singular +  `', ` + modelo.singular +  `)
    this.obtener = () => axios('/data/` + modelo.singular +  `')
    this.one = id => axios('/data/` + modelo.singular +  `/' + id)
    this.editar = id => axios.put('/data/` + modelo.singular +  `/' + id)
    this.eliminar = id => axios.delete('/data/` + modelo.singular +  `/' + id)
    this.editar = ` + modelo.singular +  ` => axios.put('/data/` + modelo.singular +  `/' + ` + modelo.singular +  `.id, ` + modelo.singular +  `)

});
`)
)

relaciones.end()
