angular.module('myapp')
.controller('historialCtrl', function($scope, $localStorage, Orden) {
    const self = this

 	var orden = $localStorage.carrito;
    class ordenes_{
        constructor(){
            this.items = []
            this.obtener();
        }

        obtener(){

            Orden.obtener()
            .then(res =>this.items = res.data)


        }
    }

    self.ordenes = new ordenes_();


});
