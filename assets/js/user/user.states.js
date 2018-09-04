app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	function template(seccion, vista, url, params) {
		let obj = {
			url: url,
			data: {
	            titulo: vista
            },
			params: params,
			views: {
				'main': {
					templateUrl: '/' +  seccion + '/' + vista,
					controller: vista + 'Ctrl as ctrl'
				}
			},
			resolve: {
				loadMyCtrl: [
					'$ocLazyLoad',
					function($ocLazyLoad) {
						return $ocLazyLoad.load([seccion + vista]);
					}
				]
			}
		}
		return obj
	}

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', template('user', 'home', '/'))
	.state('busqueda', template('user', 'busqueda', '/busqueda'))
	.state('cartel', template('user', 'cartel', '/cartel/:id', { id : null }))

}]);
