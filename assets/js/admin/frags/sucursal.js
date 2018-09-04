var app = angular.module('myapp');

app.controller('sucursalCtrl', function($scope, $stateParams, Sucursal) {

    const self = this

    class sucursal_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
    }

    Sucursal.one($stateParams.id)
    .then(response => self.sucursal = new sucursal_( response.data ))
    .then(() => $scope.$digest())


})
