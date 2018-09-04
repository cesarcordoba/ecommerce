angular.module('myapp')
.controller('productoCtrl', function( $scope , $stateParams, Producto, Inventario) {

    const
        self = this,
        id = $stateParams.id

    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerversiones()
        }
        obtenerversiones(){
            Inventario.versionesXproducto(1, id)
            .then(response => this.versiones = response.data)
            .then(() => $scope.$digest())
        }
    }

    Producto.one($stateParams.id)
    .then(response => self.producto = new producto_(response.data))
    .then(() => $scope.$digest())

    console.log(self)

});
