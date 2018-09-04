angular.module('myapp')
.controller('envioCtrl', function($scope, $localStorage, $mdDialog, $state) {
    const self = this

    class envios_ {
    	constructor(){
    		this.productos = [],
    		this.tipoEnvio  = "",
    		this.obtenerDatos();
    	}

    	obtenerDatos(){

    		this.productos.push($localStorage.carrito)
    		console.log(this.productos)
    		
    	}

		eliminar(idx){
			//console.log(idx)
			var subtotal = 0;

			 $mdDialog.show(
                $mdDialog.confirm().title('¿Seguro que quieres eliminar este producto?').textContent('Para eliminar del carrito selecciona aceptar').ok('Aceptar').cancel('Cerrar').clickOutsideToClose(true)
            )
            .then(() => {
				this.productos[0].splice(idx, 1)
				this.productos[0].forEach(n => subtotal += n.precio)
				this.productos[0].subtotal = subtotal
            })
		}

		enviarDatos(datos){
			this.productos[0].tipoEnvio = datos;
			console.log(this.productos[0])
			$localStorage.carrito = this.productos[0];
			$state.go('compras.pago')
		}
    }

    self.envios = new envios_()

	
});
