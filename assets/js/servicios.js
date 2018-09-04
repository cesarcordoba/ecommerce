async function Nube(cache, tipo, ruta){
	return await new Promise(resolve => {
		_.isUndefined(cache.get(tipo)) ?
			axios(ruta).then(response => resolve(cache.put(tipo, response)) )
			:
			resolve(cache.get(tipo))
	})
}

app.service('Producto', function() {

    this.crear = producto => axios.post('/data/producto', producto)
    this.obtener = () => axios('/data/producto')
    this.one = id => axios('/data/producto/' + id)
    this.eliminar = id => axios.delete('/data/producto/' + id)
    this.editar = producto => axios.put('/data/producto/' + producto.id, producto)
	this.filtro = peticion => axios.put('/data/filtroXproducto', peticion)
    this.busqueda = peticion => axios.put('/data/busquedaXproducto', peticion)
    this.ligargama = (producto, gama) => axios('/data/producto/ligargama/' + producto + '/' + gama)
    this.ligarmarca = (producto, marca) => axios('/data/producto/ligarmarca/' + producto + '/' + marca)
    this.ligarlinea = (producto, linea) => axios('/data/producto/ligarlinea/' + producto + '/' + linea)
    this.portada = id => axios('/data/producto/portada/' + id )
    this.imagenes = id => axios('/data/producto/imagenes/' + id )
    this.versiones = id => axios('/data/producto/versiones/' + id )
    this.versionesdisponibles = id => axios('/data/producto/versionesdisponibles/' + id )
    this.addVersion = (producto, version) => axios('/data/producto/addVersion/' + producto +  '/' + version )
    this.observaciones = id => axios('/data/producto/observaciones/' + id )
    this.ambientes = id => axios('/data/producto/ambientes/' + id )
	this.procesos = () => axios('/data/procesosXproducto')
    this.procesosXmarca = id => axios('/data/producto/procesosXmarca/' + id )
    this.promos = id => axios('/data/producto/promo/' + id )

});


app.service('Version', function() {

    this.crear = version => axios.post('/data/version', version)
    this.obtener = () => axios('/data/version')
    this.one = id => axios('/data/version/' + id)
    this.eliminar = id => axios.delete('/data/version/' + id)
    this.editar = version => axios.put('/data/version/' + version.id, version)

    this.ligaropcion = (version, opcion) => axios('/data/version/ligaropcion/' + version + '/' + opcion)
    this.desligaropcion = (version, opcion) => axios('/data/version/desligaropcion/' + version + '/' + opcion)
    this.opciones = id => axios('/data/version/opciones/' + id )

	this.opcionesdisponibles = id => axios('/data/version/opcionesdisponibles/' + id )

    this.ligaropciones = peticion => axios.put('/data/versionligaropciones', peticion )

    this.contar = id => axios('/data/version/contar/' + id )

    this.contarSucursales = id => axios('/data/version/contarSucursales/' + id )

    this.procesar = peticion => axios.put('/data/procesarversion', peticion )

    this.colores = id => axios('/data/version/colores/' + id )

    this.sucursales = id => axios('/data/version/sucursales/' + id )

    this.precio = id => axios('/data/version/precio/' + id )

	this.descuento = id => axios('/data/version/descuento/' + id )

    this.entrantes = id => axios('/data/version/entrantes/' + id )

	this.actualizar = id => axios('/data/actualizarversion/' + id )

	this.inventarios = id => axios('/data/version/inventarios/' + id )

    this.busqueda = peticion => axios.put('/data/busquedaXversion', peticion)

});



app.service('Oferta', function() {

    this.crear = oferta => axios.post('/data/oferta', oferta)
    this.obtener = () => axios('/data/oferta')
    this.one = id => axios('/data/oferta/' + id)
    this.eliminar = id => axios.delete('/data/oferta/' + id)
    this.editar = oferta => axios.put('/data/oferta/' + oferta.id, oferta)

    this.salientes = id => axios('/data/oferta/salientes/' + id)
    this.entrantes = id => axios('/data/oferta/entrantes/' + id)

	this.nuevosaliente = saliente => axios.post('/data/saliente', saliente)
    this.nuevoentrante = entrante => axios.post('/data/entrante', entrante)

	this.eliminarentrante = id => axios.delete('/data/entrante/' + id)
	this.eliminarsaliente = id => axios.delete('/data/saliente/' + id)

});

app.service('Color', function() {

    this.crear = color => axios.post('/data/color', color)
    this.obtener = () => axios('/data/color')

	this.disponibles = () => axios('/data/coloresdisponibles')


    this.one = id => axios('/data/color/' + id)
    this.eliminar = id => axios.delete('/data/color/' + id)
    this.editar = color => axios.put('/data/color/' + color.id, color)

    this.addVersion = (color, version) => axios.put('/data/color-version/' + color +  '/'  + version)
    this.removeVersion = (color, version) => axios.delete('/data/color-version/' + color +  '/'  + version)

});



app.service('Marca', function($cacheFactory) {

	var cache = $cacheFactory('marca')

    this.crear = marca => axios.post('/data/marca', marca)
	this.obtener =  async () => await Nube(cache, 'marcas', '/data/marca' )
	this.disponibles = async () => await Nube(cache, 'marcasdisponibles', '/data/marcasdisponibles' )
	this.one =  async (id) => await Nube(cache, 'marcas' + id, '/data/marca/' + id)
    this.eliminar = id => axios.delete('/data/marca/' + id)
    this.editar = marca => axios.put('/data/marca/' + marca.id, marca)
    this.filtro = peticion => axios.put('/data/filtroXmarca', peticion)
    this.productos = id => axios('/data/marca/productos/' +  id)


});



app.service('Gama', function() {

    this.crear = gama => axios.post('/data/gama', gama)
    this.obtener = () => axios('/data/gama')
    this.one = id => axios('/data/gama/' + id)
    this.eliminar = id => axios.delete('/data/gama/' + id)
    this.editar = gama => axios.put('/data/gama/' + gama.id, gama)
    this.filtro = peticion => axios.put('/data/filtroXgama', peticion)
    this.productos = id => axios('/data/gama/productos/' +  id)
	this.xMarca = id => axios('/data/gamaXmarca/' +  id)

});

app.service('Linea', function() {

    this.crear = linea => axios.post('/data/linea', linea)
    this.obtener = () => axios('/data/linea')
    this.one = id => axios('/data/linea/' + id)
    this.eliminar = id => axios.delete('/data/linea/' + id)
    this.editar = linea => axios.put('/data/linea/' + linea.id, linea)
    this.filtro = peticion => axios.put('/data/filtroXlinea', peticion)

    this.productos = id => axios('/data/linea/productos/' +  id)

    this.xMarca = id => axios('/data/lineaXmarca/' +  id)

});

app.service('Categoria', function($cacheFactory) {

	var cache = $cacheFactory('categoria', { expire: 60 * 60 * 1000})

	this.obtener = async () =>
		_.isUndefined(cache.get('categoria-obtener')) ? await axios('/data/categoria').then(r => cache.put('categoria-obtener', r)) : cache.get('categoria-obtener')

    this.crear = categoria => axios.post('/data/categoria', categoria)

    this.one = id => axios('/data/categoria/' + id)
    this.eliminar = id => axios.delete('/data/categoria/' + id)
    this.editar = categoria => axios.put('/data/categoria/' + categoria.id, categoria)
    this.ligaratributo = (categoria, atributo) => axios('/data/categoria/ligaratributo/' + categoria + '/' + atributo)
    this.desligaratributo = (categoria, atributo) => axios('/data/categoria/desligaratributo/' + categoria + '/' + atributo)
    this.atributos = id => axios('/data/categoria/atributos/' + id )
	this.subcategorias = id => axios('/data/subcategorias/' + id )
	this.nivel = nivel => axios('/data/categoria/nivel/' + nivel )
	this.cambiarNivel = (padre, hijo) => axios('/data/categoria/cambiarNivel/' + padre + '/' + hijo)
    this.completo = () => axios('/data/categoriascompleto')
	this.ultimoproducto = id => axios('/data/ultimoproductoXcategoria/' + id)

});

app.service('Opcion', function() {

    this.crear = opcion => axios.post('/data/opcion', opcion)
    this.obtener = () => axios('/data/opcion')
    this.one = id => axios('/data/opcion/' + id)
    this.eliminar = id => axios.delete('/data/opcion/' + id)
    this.editar = opcion => axios.put('/data/opcion/' + opcion.id, opcion)

});

app.service('Atributo', function() {

    this.crear = atributo => axios.post('/data/atributo', atributo)
    this.obtener = () => axios('/data/atributo')
    this.one = id => axios('/data/atributo/' + id)
    this.eliminar = id => axios.delete('/data/atributo/' + id)
    this.editar = atributo => axios.put('/data/atributo/' + atributo.id, atributo)
    this.ligaropcion = (atributo, opcion) => axios('/data/atributo/ligaropcion/' + atributo + '/' + opcion)
    this.desligaropcion = (atributo, opcion) => axios('/data/atributo/desligaropcion/' + atributo + '/' + opcion)
    this.opciones = id => axios('/data/atributo/opciones/' + id )


});


app.service('Tipo', function() {

    this.crear = tipo => axios.post('/data/tipo', tipo)
    this.obtener = () => axios('/data/tipo')
    this.one = id => axios('/data/tipo/' + id)
    this.eliminar = id => axios.delete('/data/tipo/' + id)
    this.editar = tipo => axios.put('/data/tipo/' + tipo.id, tipo)

});

app.service('Ambiente', function() {



    this.crear = ambiente => axios.post('/data/ambiente', ambiente)
    this.obtener = () => axios('/data/ambiente')
    this.one = id => axios('/data/ambiente/' + id)
    this.eliminar = id => axios.delete('/data/ambiente/' + id)
    this.editar = ambiente => axios.put('/data/ambiente/' + ambiente.id, ambiente)
    this.filtro = peticion => axios.put('/data/filtroXambiente', peticion)
	this.productos = id => axios('/data/ambiente/productos/' + id)
    this.ligarproducto = (  ambiente , producto ) => axios('/data/ambiente-producto/' + ambiente + '/' + producto )
    this.desligarproducto = (  ambiente , producto ) => axios.delete('/data/ambiente-producto/' + ambiente + '/' + producto )
    this.crearYligar = (  id ) => axios('/data/ambiente/crearYligar/' + id )
	this.espacio = id => axios('/data/ambiente/espacio/' +  id )
	this.relacionados = id => axios('/data/ambiente/relacionados/' +  id )

	this.gama = id => axios('/data/ambiente/gama/' +  id )



});

app.service('Posicion', function() {

    this.crear = posicion => axios.post('/data/posicion', posicion)
    this.obtener = () => axios('/data/posicion')
    this.one = id => axios('/data/posicion/' + id)
    this.eliminar = id => axios.delete('/data/posicion/' + id)
    this.editar = posicion => axios.put('/data/posicion', posicion)
	this.contar = id => axios('/data/posicion/contar/' + id)

});

app.service('Sucursal', function($cacheFactory) {

	var cache = $cacheFactory('sucursales')

    this.crear = sucursal => axios.post('/data/sucursal', sucursal)
	this.obtener =  async () => await Nube(cache, 'sucursales', '/data/sucursal' )
	this.one =  async (id) => await Nube(cache, 'sucursal' + id, '/data/sucursal/' + id )
    this.eliminar = id => axios.delete('/data/sucursal/' + id)
    this.editar = sucursal => axios.put('/data/sucursal/' + sucursal.id, sucursal)
	this.filtro = peticion => axios.put('/data/filtroXsucursal', peticion)
	this.productos = (peticion) => axios.put('/data/productosXsucursal', peticion)

});

app.service('Foto', function() {

    this.crear = foto => axios.post('/data/foto', foto)
    this.obtener = () => axios('/data/foto')
    this.one = id => axios('/data/foto/' + id)
    this.eliminar = id => axios.delete('/data/foto/' + id)
    this.editar = foto => axios.put('/data/foto/' + foto.id, foto)

});

app.service('Promocion', function() {

    this.crear = promo => axios.post('/data/promo', promo)
    this.obtener = () => axios('/data/promo')
    this.one = id => axios('/data/promo/' + id)
    this.eliminar = id => axios.delete('/data/promo/' + id)
    this.editar = promo => axios.put('/data/promo/' + promo.id, promo)
	this.productos = id => axios('/data/promo/productos/' + id)

	this.ofertas = id => axios('/data/promo/ofertas/' + id)

	this.descuentos = id => axios('/data/promo/descuentos/' + id)

	this.ligarproducto = (promo, producto) => axios.put('/data/promo-producto/' + promo + '/' + producto)
    this.desligarproducto = (promo, producto) => axios.delete('/data/promo-producto/' + promo + '/' + producto)

});

app.service('Observacion', function() {

    this.crear = observacion => axios.post('/data/observacion', observacion)
    this.obtener = () => axios('/data/observacion')
    this.one = id => axios('/data/observacion/' + id)
    this.eliminar = id => axios.delete('/data/observacion/' + id)
    this.editar = observacion => axios.put('/data/observacion/' + observacion.id, observacion)

});

app.service('Imagen', function() {

    this.crear = imagen => axios.post('/data/imagen', imagen)
    this.obtener = () => axios('/data/imagen')
    this.one = id => axios('/data/imagen/' + id)
    this.eliminar = id => axios.delete('/data/imagen/' + id)
    this.editar = imagen => axios.put('/data/imagen/' + imagen.id, imagen)

});

app.service('Espacio', function($cacheFactory) {


	var cache = $cacheFactory('espacio')

	console.log(cache.info())

    this.crear = espacio => axios.post('/data/espacio', espacio)
    this.obtener = () => axios('/data/espacio')
    this.one = async (id) =>
		// axios('/data/espacio/' + id)
		_.isUndefined(cache.get('espacio-' + id )) ? await axios('/data/espacio/' + id).then(r => cache.put('espacio-' + id, r)) : cache.get('espacio-' + id)

	this.eliminar = id => axios.delete('/data/espacio/' + id)
    this.editar = espacio => axios.put('/data/espacio/' + espacio.id, espacio)

    this.contar = id => axios('/data/espacio/contar/' + id)

});

app.service('Cuarto', function() {

    this.crear = cuarto => axios.post('/data/cuarto', cuarto)
    this.obtener = () => axios('/data/cuarto')
    this.one = id => axios('/data/cuarto/' + id)
    this.eliminar = id => axios.delete('/data/cuarto/' + id)
    this.editar = cuarto => axios.put('/data/cuarto/' + cuarto.id, cuarto)

});

app.service('Portada', function($cacheFactory) {

	var cache = $cacheFactory('portada')

    this.crear = portada => axios.post('/data/portada', portada)
    this.obtener = () => axios('/data/portada')
    this.one = async (id) =>
	   _.isUndefined(cache.get('portada-' + id )) ? await axios('/data/portada/' + id).then(r => cache.put('portada-' + id, r)) : cache.get('portada-' + id)

    this.eliminar = id => axios.delete('/data/portada/' + id)
    this.editar = portada => axios.put('/data/portada/' + portada.id, portada)
    this.producto = id => axios('/data/portadaXproducto/' + id)

});

app.service('Precio', function() {

    this.crear = precio => axios.post('/data/precio', precio)
    this.obtener = () => axios('/data/precio')
    this.one = id => axios('/data/precio/' + id)
    this.eliminar = id => axios.delete('/data/precio/' + id)
    this.editar = precio => axios.put('/data/precio/' + precio.id, precio)

});

app.service('Descuento', function() {

    this.crear = descuento => axios.post('/data/descuento', descuento)
    this.obtener = () => axios('/data/descuento')
    this.one = id => axios('/data/descuento/' + id)
    this.eliminar = id => axios.delete('/data/descuento/' + id)
    this.editar = descuento => axios.put('/data/descuento/' + descuento.id, descuento)

	this.ligarversion = (descuento, version) => axios('/data/descuento-version/' + descuento + '/' + version )

    this.versiones = id => axios('/data/descuento/versiones/' +  id)

});

app.service('Existencia', function() {

    this.crear = existencia => axios.post('/data/existencia', existencia)
    this.obtener = () => axios('/data/existencia')
    this.one = id => axios('/data/existencia/' + id)
    this.eliminar = id => axios.delete('/data/existencia/' + id)
    this.editar = existencia => axios.put('/data/existencia/' + existencia.id, existencia)

});

app.service('Favorito', function() {

    this.crear = favorito => axios.post('/data/favorito', favorito)
    this.obtener = () => axios('/data/favorito')
    this.one = id => axios('/data/favorito/' + id)
    this.eliminar = id => axios.delete('/data/favorito/' + id)
    this.editar = favorito => axios.put('/data/favorito/' + favorito.id, favorito)

});

app.service('Tarjeta', function() {

    this.crear = tarjeta => axios.post('/data/tarjeta', tarjeta)
    this.obtener = () => axios('/data/tarjeta')
    this.one = id => axios('/data/tarjeta/' + id)
    this.eliminar = id => axios.delete('/data/tarjeta/' + id)
    this.editar = tarjeta => axios.put('/data/tarjeta/' + tarjeta.id, tarjeta)

});

app.service('Usuario', function() {

    this.crear = usuario => axios.post('/data/usuario', usuario)
    this.obtener = () => axios('/data/usuario')
    this.one = id => axios('/data/usuario/' + id)
    this.eliminar = id => axios.delete('/data/usuario/' + id)
    this.editar = usuario => axios.put('/data/usuario/' + usuario.id, usuario)
    this.registro = usuario => axios.post('/data/registro', usuario)
    this.login = usuario => axios.post('/data/login', usuario)
    this.token = token => axios('/data/token/' + token)


});

app.service('Avatar', function() {

    this.crear = avatar => axios.post('/data/avatar', avatar)
    this.obtener = () => axios('/data/avatar')
    this.one = id => axios('/data/avatar/' + id)
    this.eliminar = id => axios.delete('/data/avatar/' + id)
    this.editar = avatar => axios.put('/data/avatar/' + avatar.id, avatar)

});

app.service('Direccion', function() {

    this.crear = direccion => axios.post('/data/direccion', direccion)
    this.obtener = () => axios('/data/direccion')
    this.one = id => axios('/data/direccion/' + id)
    this.eliminar = id => axios.delete('/data/direccion/' + id)
    this.editar = direccion => axios.put('/data/direccion/' + direccion.id, direccion)

});

app.service('Transaccion', function() {

    this.crear = transaccion => axios.post('/data/transaccion', transaccion)
    this.obtener = () => axios('/data/transaccion')
    this.one = id => axios('/data/transaccion/' + id)
    this.eliminar = id => axios.delete('/data/transaccion/' + id)
    this.editar = transaccion => axios.put('/data/transaccion/' + transaccion.id, transaccion)

});

app.service('Orden', function() {

    this.crear = orden => axios.post('/data/orden', orden)
    this.obtener = () => axios('/data/orden')
    this.one = id => axios('/data/orden/' + id)
    this.eliminar = id => axios.delete('/data/orden/' + id)
    this.editar = orden => axios.put('/data/orden/' + orden.id, orden)
	this.openpayService = datos => axios.post('/data/orden/OpenPay/', datos)
});

app.service('Status', function() {

    this.crear = status => axios.post('/data/status', status)
    this.obtener = () => axios('/data/status')
    this.one = id => axios('/data/status/' + id)
    this.eliminar = id => axios.delete('/data/status/' + id)
    this.editar = status => axios.put('/data/status/' + status.id, status)

});

app.service('Factura', function() {

    this.crear = factura => axios.post('/data/factura', factura)
    this.obtener = () => axios('/data/factura')
    this.one = id => axios('/data/factura/' + id)
    this.eliminar = id => axios.delete('/data/factura/' + id)
    this.editar = factura => axios.put('/data/factura/' + factura.id, factura)

});

app.service('Paquete', function() {

    this.crear = paquete => axios.post('/data/paquete', paquete)
    this.obtener = () => axios('/data/paquete')
    this.one = id => axios('/data/paquete/' + id)
    this.eliminar = id => axios.delete('/data/paquete/' + id)
    this.editar = paquete => axios.put('/data/paquete/' + paquete.id, paquete)

});

app.service('Existente', function() {

    this.crear = existente => axios.post('/data/existente', existente)
    this.obtener = () => axios('/data/existente')
    this.one = id => axios('/data/existente/' + id)
    this.eliminar = id => axios.delete('/data/existente/' + id)
    this.editar = existente => axios.put('/data/existente/' + existente.id, existente)

});

app.service('Inventario', function() {

    this.crear = inventario => axios.post('/data/inventario', inventario)
    this.obtener = () => axios('/data/inventario')
    this.one = id => axios('/data/inventario/' + id)
    this.eliminar = id => axios.delete('/data/inventario/' + id)
    this.editar = inventario => axios.put('/data/inventario/' + inventario.id, inventario)
	this.versionesXproducto = (sucursal, producto) => axios('/data/versionesXproducto/' + sucursal + '/' + producto)

	this.precios = id => axios('/data/inventario/precios/' + id)
	this.descuentos = id => axios('/data/inventario/descuentos/' + id)
	this.existencias = id => axios('/data/inventario/existencias/' + id)

});


app.service('Firebird', function() {

    this.obtener = peticion => axios.put('/data/firebird', peticion)
    this.tablas = peticion => axios.put('/data/tablas', peticion)


});


app.service('Base', function() {

    this.obtener = () => axios('/data/bases')
    this.tablaXbase = id => axios('/data/tablaXbase/' + id)


});


app.service('Tabla', function() {

    this.cantidad = id => axios('/data/tabla/cantidad/' + id)

});
