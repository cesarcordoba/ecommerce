angular.module('myapp')
.controller('loginCtrl', function($scope, $state, $localStorage, alertas, $rootScope, $mdDialog, $window, Auth, Usuario) {
    
    const self = this


    class login_ {
        constructor() {

        }
        enviar(usuario){
            Auth.login(usuario)

			
        }
        registrar(usuario){
            Auth.registro(usuario)
            $rootScope.logueado = true;
            $state.go('perfil.infobasica')

        }
    }

    self.login = new login_()

});
