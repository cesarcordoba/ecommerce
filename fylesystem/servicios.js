
app.service('Producto', function() {

    this.crear = producto => axios.post('/data/producto', producto)
    this.obtener = () => axios('/data/producto')
    this.one = id => axios('/data/producto/' + id)
    this.editar = id => axios.put('/data/producto/' + id)
    this.eliminar = id => axios.delete('/data/producto/' + id)
    this.editar = producto => axios.put('/data/producto/' + producto.id, producto)

});

app.service('Gama', function() {

    this.crear = gama => axios.post('/data/gama', gama)
    this.obtener = () => axios('/data/gama')
    this.one = id => axios('/data/gama/' + id)
    this.editar = id => axios.put('/data/gama/' + id)
    this.eliminar = id => axios.delete('/data/gama/' + id)
    this.editar = gama => axios.put('/data/gama/' + gama.id, gama)

});

app.service('Linea', function() {

    this.crear = linea => axios.post('/data/linea', linea)
    this.obtener = () => axios('/data/linea')
    this.one = id => axios('/data/linea/' + id)
    this.editar = id => axios.put('/data/linea/' + id)
    this.eliminar = id => axios.delete('/data/linea/' + id)
    this.editar = linea => axios.put('/data/linea/' + linea.id, linea)

});

app.service('Categoria', function() {

    this.crear = categoria => axios.post('/data/categoria', categoria)
    this.obtener = () => axios('/data/categoria')
    this.one = id => axios('/data/categoria/' + id)
    this.editar = id => axios.put('/data/categoria/' + id)
    this.eliminar = id => axios.delete('/data/categoria/' + id)
    this.editar = categoria => axios.put('/data/categoria/' + categoria.id, categoria)

});

app.service('Opcion', function() {

    this.crear = opcion => axios.post('/data/opcion', opcion)
    this.obtener = () => axios('/data/opcion')
    this.one = id => axios('/data/opcion/' + id)
    this.editar = id => axios.put('/data/opcion/' + id)
    this.eliminar = id => axios.delete('/data/opcion/' + id)
    this.editar = opcion => axios.put('/data/opcion/' + opcion.id, opcion)

});

app.service('Atributo', function() {

    this.crear = atributo => axios.post('/data/atributo', atributo)
    this.obtener = () => axios('/data/atributo')
    this.one = id => axios('/data/atributo/' + id)
    this.editar = id => axios.put('/data/atributo/' + id)
    this.eliminar = id => axios.delete('/data/atributo/' + id)
    this.editar = atributo => axios.put('/data/atributo/' + atributo.id, atributo)

});

app.service('Tipo', function() {

    this.crear = tipo => axios.post('/data/tipo', tipo)
    this.obtener = () => axios('/data/tipo')
    this.one = id => axios('/data/tipo/' + id)
    this.editar = id => axios.put('/data/tipo/' + id)
    this.eliminar = id => axios.delete('/data/tipo/' + id)
    this.editar = tipo => axios.put('/data/tipo/' + tipo.id, tipo)

});

app.service('Marca', function() {

    this.crear = marca => axios.post('/data/marca', marca)
    this.obtener = () => axios('/data/marca')
    this.one = id => axios('/data/marca/' + id)
    this.editar = id => axios.put('/data/marca/' + id)
    this.eliminar = id => axios.delete('/data/marca/' + id)
    this.editar = marca => axios.put('/data/marca/' + marca.id, marca)

});

app.service('Ambiente', function() {

    this.crear = ambiente => axios.post('/data/ambiente', ambiente)
    this.obtener = () => axios('/data/ambiente')
    this.one = id => axios('/data/ambiente/' + id)
    this.editar = id => axios.put('/data/ambiente/' + id)
    this.eliminar = id => axios.delete('/data/ambiente/' + id)
    this.editar = ambiente => axios.put('/data/ambiente/' + ambiente.id, ambiente)

});

app.service('Sucursal', function() {

    this.crear = sucursal => axios.post('/data/sucursal', sucursal)
    this.obtener = () => axios('/data/sucursal')
    this.one = id => axios('/data/sucursal/' + id)
    this.editar = id => axios.put('/data/sucursal/' + id)
    this.eliminar = id => axios.delete('/data/sucursal/' + id)
    this.editar = sucursal => axios.put('/data/sucursal/' + sucursal.id, sucursal)

});

app.service('Foto', function() {

    this.crear = foto => axios.post('/data/foto', foto)
    this.obtener = () => axios('/data/foto')
    this.one = id => axios('/data/foto/' + id)
    this.editar = id => axios.put('/data/foto/' + id)
    this.eliminar = id => axios.delete('/data/foto/' + id)
    this.editar = foto => axios.put('/data/foto/' + foto.id, foto)

});

app.service('Promocion', function() {

    this.crear = promo => axios.post('/data/promo', promo)
    this.obtener = () => axios('/data/promo')
    this.one = id => axios('/data/promo/' + id)
    this.editar = id => axios.put('/data/promo/' + id)
    this.eliminar = id => axios.delete('/data/promo/' + id)
    this.editar = promo => axios.put('/data/promo/' + promo.id, promo)

});

app.service('Imagen', function() {

    this.crear = imagen => axios.post('/data/imagen', imagen)
    this.obtener = () => axios('/data/imagen')
    this.one = id => axios('/data/imagen/' + id)
    this.editar = id => axios.put('/data/imagen/' + id)
    this.eliminar = id => axios.delete('/data/imagen/' + id)
    this.editar = imagen => axios.put('/data/imagen/' + imagen.id, imagen)

});

app.service('Portada', function() {

    this.crear = portada => axios.post('/data/portada', portada)
    this.obtener = () => axios('/data/portada')
    this.one = id => axios('/data/portada/' + id)
    this.editar = id => axios.put('/data/portada/' + id)
    this.eliminar = id => axios.delete('/data/portada/' + id)
    this.editar = portada => axios.put('/data/portada/' + portada.id, portada)

});

app.service('Precio', function() {

    this.crear = precio => axios.post('/data/precio', precio)
    this.obtener = () => axios('/data/precio')
    this.one = id => axios('/data/precio/' + id)
    this.editar = id => axios.put('/data/precio/' + id)
    this.eliminar = id => axios.delete('/data/precio/' + id)
    this.editar = precio => axios.put('/data/precio/' + precio.id, precio)

});

app.service('Favorito', function() {

    this.crear = favorito => axios.post('/data/favorito', favorito)
    this.obtener = () => axios('/data/favorito')
    this.one = id => axios('/data/favorito/' + id)
    this.editar = id => axios.put('/data/favorito/' + id)
    this.eliminar = id => axios.delete('/data/favorito/' + id)
    this.editar = favorito => axios.put('/data/favorito/' + favorito.id, favorito)

});

app.service('Tarjeta', function() {

    this.crear = tarjeta => axios.post('/data/tarjeta', tarjeta)
    this.obtener = () => axios('/data/tarjeta')
    this.one = id => axios('/data/tarjeta/' + id)
    this.editar = id => axios.put('/data/tarjeta/' + id)
    this.eliminar = id => axios.delete('/data/tarjeta/' + id)
    this.editar = tarjeta => axios.put('/data/tarjeta/' + tarjeta.id, tarjeta)

});

app.service('Usuario', function() {

    this.crear = usuario => axios.post('/data/usuario', usuario)
    this.obtener = () => axios('/data/usuario')
    this.one = id => axios('/data/usuario/' + id)
    this.editar = id => axios.put('/data/usuario/' + id)
    this.eliminar = id => axios.delete('/data/usuario/' + id)
    this.editar = usuario => axios.put('/data/usuario/' + usuario.id, usuario)

});

app.service('Avatar', function() {

    this.crear = avatar => axios.post('/data/avatar', avatar)
    this.obtener = () => axios('/data/avatar')
    this.one = id => axios('/data/avatar/' + id)
    this.editar = id => axios.put('/data/avatar/' + id)
    this.eliminar = id => axios.delete('/data/avatar/' + id)
    this.editar = avatar => axios.put('/data/avatar/' + avatar.id, avatar)

});

app.service('Direccion', function() {

    this.crear = direccion => axios.post('/data/direccion', direccion)
    this.obtener = () => axios('/data/direccion')
    this.one = id => axios('/data/direccion/' + id)
    this.editar = id => axios.put('/data/direccion/' + id)
    this.eliminar = id => axios.delete('/data/direccion/' + id)
    this.editar = direccion => axios.put('/data/direccion/' + direccion.id, direccion)

});

app.service('Transaccion', function() {

    this.crear = transaccion => axios.post('/data/transaccion', transaccion)
    this.obtener = () => axios('/data/transaccion')
    this.one = id => axios('/data/transaccion/' + id)
    this.editar = id => axios.put('/data/transaccion/' + id)
    this.eliminar = id => axios.delete('/data/transaccion/' + id)
    this.editar = transaccion => axios.put('/data/transaccion/' + transaccion.id, transaccion)

});

app.service('Orden', function() {

    this.crear = orden => axios.post('/data/orden', orden)
    this.obtener = () => axios('/data/orden')
    this.one = id => axios('/data/orden/' + id)
    this.editar = id => axios.put('/data/orden/' + id)
    this.eliminar = id => axios.delete('/data/orden/' + id)
    this.editar = orden => axios.put('/data/orden/' + orden.id, orden)

});

app.service('Status', function() {

    this.crear = status => axios.post('/data/status', status)
    this.obtener = () => axios('/data/status')
    this.one = id => axios('/data/status/' + id)
    this.editar = id => axios.put('/data/status/' + id)
    this.eliminar = id => axios.delete('/data/status/' + id)
    this.editar = status => axios.put('/data/status/' + status.id, status)

});

app.service('Factura', function() {

    this.crear = factura => axios.post('/data/factura', factura)
    this.obtener = () => axios('/data/factura')
    this.one = id => axios('/data/factura/' + id)
    this.editar = id => axios.put('/data/factura/' + id)
    this.eliminar = id => axios.delete('/data/factura/' + id)
    this.editar = factura => axios.put('/data/factura/' + factura.id, factura)

});

app.service('Paquete', function() {

    this.crear = paquete => axios.post('/data/paquete', paquete)
    this.obtener = () => axios('/data/paquete')
    this.one = id => axios('/data/paquete/' + id)
    this.editar = id => axios.put('/data/paquete/' + id)
    this.eliminar = id => axios.delete('/data/paquete/' + id)
    this.editar = paquete => axios.put('/data/paquete/' + paquete.id, paquete)

});

app.service('Existente', function() {

    this.crear = existente => axios.post('/data/existente', existente)
    this.obtener = () => axios('/data/existente')
    this.one = id => axios('/data/existente/' + id)
    this.editar = id => axios.put('/data/existente/' + id)
    this.eliminar = id => axios.delete('/data/existente/' + id)
    this.editar = existente => axios.put('/data/existente/' + existente.id, existente)

});

app.service('Inventario', function() {

    this.crear = inventario => axios.post('/data/inventario', inventario)
    this.obtener = () => axios('/data/inventario')
    this.one = id => axios('/data/inventario/' + id)
    this.editar = id => axios.put('/data/inventario/' + id)
    this.eliminar = id => axios.delete('/data/inventario/' + id)
    this.editar = inventario => axios.put('/data/inventario/' + inventario.id, inventario)

});
