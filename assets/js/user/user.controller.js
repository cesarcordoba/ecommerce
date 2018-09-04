app.controller('userCtrl', function($window, $scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, $localStorage) {

    $scope.usuario = $localStorage.usuario;

    $scope.icono = 'menu';
    $scope.menu = function(){
        $mdSidenav('left').toggle();
        $scope.icono = $scope.icono === 'menu' ? $scope.icono = 'clear' : $scope.icono = 'menu';
    }

    $scope.secciones = [
        {
            icon: 'home',
            nombre: 'Home',
            state: 'home'
        }, {
            icon : 'search',
            nombre: 'Busqueda',
            state: 'busqueda'
        }
    ];

});
