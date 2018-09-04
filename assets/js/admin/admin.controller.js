app.controller('adminCtrl', function ($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav) {

    $scope.productos = [];

    $scope.mdDialogTarjeta = function(data){
        mdDialog.mostrardialog('nuevoproducto', 'adminCtrl', $scope.customFullscreen);
    }

    $scope.secciones = [
        {
            nombre: 'home',
            state: 'home',
            icon: ''
        }, {
            nombre: 'Articulos',
            state: 'articulos',
            icon: ''
        }, {
            nombre: 'Ambientes',
            state: 'ambientes',
            icon: ''
        }, {
            nombre: 'Extras',
            state: 'extras',
            icon: ''
        }, {
            nombre: 'Sucursales',
            state: 'sucursales',
            icon: ''
        }, {
            nombre: 'Externo',
            state: 'externo',
            icon: ''
        }, {
            nombre: 'Promociones',
            state: 'promociones',
            icon: ''
        }, {
            nombre: 'Ordenes',
            state: 'ordenes',
            icon: ''
        }
    ]

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.obtenerProductos = function(data){
        Producto.obtenerProductos().then(function(data){
            $scope.productos = data;
            console.log($scope.productos)
        })
    }

    $scope.crearProducto = function(data){
        Producto.crearProducto(data, function(data){
            let producto = data.data
            console.log(producto);
            $scope.productos.push(producto);

        })
    }

});
