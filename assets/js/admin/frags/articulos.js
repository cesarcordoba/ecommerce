angular.module('myapp')
.controller('articulosCtrl', function($scope) {

    const self = this

    $scope.secciones = [
        {
            nombre: 'productos',
            state: 'productos',
            icon: ''
        }, {
            nombre: 'lineas',
            state: 'lineas',
            icon: ''
        }
    ]


});
