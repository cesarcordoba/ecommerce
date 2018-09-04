app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	const template = (vista, url) => new Object({

			url: url,
			views: {
				'main': {
					templateUrl: '/sucursal/' + vista,
					controller: vista + 'Ctrl as ctrl'
				}
			},
			resolve: {
				loadMyCtrl: [
					'$ocLazyLoad',
					function($ocLazyLoad) {
						return $ocLazyLoad.load(['sucursal' + vista]);
					}
				]
			}
		})

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', template('home', '/'))
	.state('inventario', template('inventario', '/inventario'))
	.state('producto', template('producto', '/producto/:id', {id : null}))

}])
