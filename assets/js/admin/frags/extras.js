var app = angular.module('myapp');

app.controller('extrasCtrl', function($scope) {

    const self = this

    $scope.secciones = [
        {
            nombre: 'categorias',
            state: 'categorias',
            icon: ''
        }, {
            nombre: 'gamas',
            state: 'gamas',
            icon: ''
        }, {
            nombre: 'ambientes',
            state: 'ambientes',
            icon: ''
        }, {
            nombre: 'lineas',
            state: 'lineas',
            icon: ''
        }, {
            nombre: 'marcas',
            state: 'marcas',
            icon: ''
        }
    ]


});
