angular.module('myapp')
.controller('ordenesCtrl', function($scope, $localStorage, Orden) {

    const self = this

    class ordenesAdmin_{
        constructor(){
            this.items = []
            this.obtener();
        }

        obtener(){

            Orden.obtener()
            .then(res =>this.items = res.data)


        }
    }

    self.ordenes = new ordenesAdmin_();
});
