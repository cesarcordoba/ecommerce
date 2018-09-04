angular.module('myapp')
.controller('confirmacionCtrl', function($scope, $localStorage) {
    const self = this

    console.log($localStorage.carrito)
});
