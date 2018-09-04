angular.module('myapp')
.controller('inventarioCtrl', function( $scope , $mdDialog, Sucursal, Producto) {

    const
        self = this,
        id = 1

	class productos_ {
		constructor() {}
		seleccion(){}
        buscar(){}
        async filtrar(){
            return this.items ?
            this.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
            :
            await Producto.obtener()
            .then(response => this.items = response.data)
        }
        ligar(){
            $mdDialog.show({
                templateUrl: '/partialssucursal/ligarproducto',
                parent: angular.element(document.body),
                bindToController: true,
                locals : {
                    item : this.item,
                    sucursal : 1
                },
                preserveScope: true,
                fullscreen: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, sucursal, Producto, Inventario) {

                    Object.entries(item).forEach(n => this[n[0]] = n[1])

                    Producto.versiones(this.id)
                    .then(response => this.versiones = response.data.map(n => new version_(n)))
                    .then(() => $scope.$digest())

                    class version_ {
                        constructor(arg) {
                            Object.entries(arg).forEach(n => this[n[0]] = n[1])
                        }
                        ligar(){
                            Inventario.crear({IdVersion : this.id, IdSucursal : sucursal})
                            .then(response => console.log(response))
                        }
                    }

                }
            })
            .then(response => decode(response))
        }
	}

    class inventario_ {
        constructor() {
            this.filtro = {
                id : id,
                pagina : 1,
                limite : 10,
            }
            this.obtener()
        }
        obtener(){

            Sucursal.productos(this.filtro)
            .then(response => this.items = response.data.map(n => new producto_(n)))
            .then(response => console.log(response))
            .then(() => $scope.$digest())

        }
    }

    class producto_ {
        constructor(arg) {
            this.id = arg[0]
            this.versiones = arg[1]
        }
    }

    self.inventario = new inventario_()
    self.productos = new productos_()


});
