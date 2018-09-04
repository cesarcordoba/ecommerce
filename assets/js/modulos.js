app.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {

    var template = (seccion, vista) => new Object({
        name: seccion + vista,
        files: [ 'js/' + seccion + '/frags/' + vista + '.js' ]
    })

    $ocLazyLoadProvider.config({
        debug: false,
        modules: [

            template('main', 'home'),
            template('main', 'productos'),
			template('main', 'producto'),

            template('main', 'espacios'),
            template('main', 'espacio'),

            template('main', 'sucursales'),
            template('main', 'ayuda'),
            template('main', 'terminos'),
            template('main', 'politicas'),
            template('main', 'perfil'),
            template('main', 'login'),
            template('main', 'infobasica'),
            template('main', 'historial'),
            template('main', 'metodosPago'),

            template('main', 'carrito'),
            template('main', 'compras'),
            template('main', 'direccion'),
            template('main', 'envio'),
            template('main', 'pago'),
            template('main', 'confirmacion'),

            template('admin', 'home'),

			template('admin', 'sucursales'),
			template('admin', 'sucursal'),

			template('admin', 'articulos'),
            template('admin', 'producto'),
            template('admin', 'productos'),

            template('admin', 'ambiente'),
            template('admin', 'ambientes'),

            template('admin', 'extras'),
            template('admin', 'categoria'),
            template('admin', 'categorias'),
            template('admin', 'gama'),
            template('admin', 'gamas'),
            template('admin', 'linea'),
            template('admin', 'lineas'),

			template('admin', 'promocion'),
			template('admin', 'promociones'),

            template('admin', 'marca'),
            template('admin', 'marcas'),

            template('admin', 'externo'),
            template('admin', 'ordenes'),


			template('sucursal', 'home'),
            template('sucursal', 'inventario'),
			template('sucursal', 'producto')


        ]
    });
}]);
