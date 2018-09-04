app.controller('sucursalCtrl', function ($scope, $mdSidenav) {


    $scope.secciones = [
        {
            nombre: 'home',
            state: 'home',
            icon: ''
        }, {
            nombre: 'Inventario',
            state: 'inventario',
            icon: ''
        }
    ]

    $scope.toggleLeft = () => $mdSidenav('left').toggle()


});
