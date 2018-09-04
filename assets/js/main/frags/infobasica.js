angular.module('myapp')
.controller('infobasicaCtrl', function($scope, $localStorage, Usuario) {
    const self = this;

    self.usuario = $localStorage.usuario;
 
 	console.log(self.usuario)

});
