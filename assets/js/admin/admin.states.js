app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	const template = (vista, url) => new Object({

			url: url,
			views: {
				'main': {
					templateUrl: '/admin/' + vista,
					controller: vista + 'Ctrl as ctrl'
				}
			},
			resolve: {
				loadMyCtrl: [
					'$ocLazyLoad',
					function($ocLazyLoad) {
						return $ocLazyLoad.load(['admin' + vista]);
					}
				]
			}
		})

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', template('home', '/'))

	.state('sucursales', template('sucursales', '/sucursales'))
	.state('sucursal', template('sucursal', '/sucursal/:id', {id : null} ))


	.state('articulos', template('articulos', '/articulos'))

	.state('articulos.productos', template('productos', '/productos'))
	.state('producto', template('producto', '/producto/:id/:version', {id : null, version : null} ))

	.state('extras.lineas', template('lineas', '/lineas'))
	.state('linea', template('linea', '/linea/:id', {id : null} ))

	.state('extras', template('extras', '/extras'))

	.state('extras.categorias', template('categorias', '/categorias'))
	.state('categoria', template('categoria', '/categoria/:id', {id : null} ))


	.state('extras.marcas', template('marcas', '/marcas'))
	.state('marca', template('marca', '/marca/:id', {id : null} ))

	.state('ambientes', template('ambientes', '/ambientes'))
	.state('ambiente', template('ambiente', '/ambiente/:id', {id : null} ))

	.state('extras.gamas', template('gamas', '/gamas'))

	.state('gama', template('gama', '/gama/:id', {id : null} ))

	.state('externo', template('externo', '/externo'))

	.state('promociones', template('promociones', '/promociones'))
	.state('promocion', template('promocion', '/promocion/:id', {id : null} ))

	.state('ordenes', template('ordenes', '/ordenes'))






}])
