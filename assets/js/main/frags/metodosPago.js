angular.module('myapp')
.controller('metodosPagoCtrl', function($scope, $localStorage, $mdDialog) {
    const self = this;

    class metodos_{
    	constructor(){

    	}

    	agregarTarjeta(){

    		$mdDialog.show({
                templateUrl: '/dialogs/nuevoMetodo',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, alertas, $state) {
                    $scope.submit = function(tarjeta) {
                        
                        console.log(tarjeta)
                    }
                    $scope.close = function() {
                        $mdDialog.hide(false);
                    }
                }
            })

    	}
    }

    self.metodos = new metodos_();

});
