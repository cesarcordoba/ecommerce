app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

        const template = (vista, url) => new Object({
                url: url,
                views: {
                    'main': {
                        templateUrl: '/main/' + vista,
                        controller: vista + 'Ctrl as ctrl'
                    }
                },
                resolve: {
                    loadMyCtrl: [
                        '$ocLazyLoad',
                        function($ocLazyLoad) {
                            return $ocLazyLoad.load(['main' + vista]);
                        }
                    ]
                }
            })


        $urlRouterProvider.otherwise('/');
        $stateProvider


        .state('home', template('home', '/'))
        .state('productos', template('productos', '/productos'))
        .state('producto', template('producto', '/producto/:id', {id : null}))
        .state('login', template('login', '/login'))
        .state('espacios', template('espacios', '/espacios'))
        .state('espacio', template('espacio', '/espacio/:id'))
        .state('sucursales', template('sucursales', '/sucursales')) //Apartir de aqui son nuevas vistas
        .state('ayuda', template('ayuda', '/ayuda'))
        .state('terminos', template('terminos', '/terminos'))
        .state('politicas', template('politicas', '/politicas'))
        .state('perfil', template('perfil', '/perfil'))
        .state('perfil.infobasica', template('infobasica', '/infobasica'))
        .state('perfil.historial', template('historial', '/historial'))
        .state('perfil.metodosPago', template('metodosPago', '/metodosPago'))
        .state('carrito', template('carrito', '/carrito'))
        .state('compras', template('compras', '/compras'))
        .state('compras.direccion', template('direccion', '/direccion'))
        .state('compras.envio', template('envio', '/envio'))
        .state('compras.pago', template('pago', '/pago'))
        .state('compras.confirmacion', template('confirmacion', '/confirmacion'))
        
        // .state('home', template('/', '/main/home', 'homeCtrl', 'ozMainHome'))
    }
]);