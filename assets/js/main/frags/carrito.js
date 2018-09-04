angular.module('myapp')
.controller('carritoCtrl', function($scope, $localStorage, $state) {

    const self = this

    self.subtotal = 0;
    var bolsa = $localStorage.bolsa;

	class carrito_{
		constructor(){
			this.cargarObjetos();

		}

		cargarObjetos(){

            this.objetos = bolsa;
             console.log(this.objetos)

			// this.objetos =  [
			// 	{
			// 		descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quia, autem laboriosam totam et amet deleniti quisquam eius quae, blanditiis ad natus omnis nam placeat exercitationem repellat. Perferendis, soluta, quaerat",
			// 		precio: 100,
			// 		cantidad: 1
			// 	},{
			// 		descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quia, autem laboriosam totam et amet deleniti quisquam eius quae, blanditiis ad natus omnis nam placeat exercitationem repellat. Perferendis, soluta, quaerat",
			// 		precio: 200,
			// 		cantidad: 2
			// 	},{
			// 		descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quia, autem laboriosam totam et amet deleniti quisquam eius quae, blanditiis ad natus omnis nam placeat exercitationem repellat. Perferendis, soluta, quaerat",
			// 		precio: 300,
			// 		cantidad: 3
			// 	},{
			// 		descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit quia, autem laboriosam totam et amet deleniti quisquam eius quae, blanditiis ad natus omnis nam placeat exercitationem repellat. Perferendis, soluta, quaerat",
			// 		precio: 400,
			// 		cantidad: 4
			// 	}
			// ].map(n => new item(n));

			this.objetos.forEach(n => self.subtotal = n.precio + self.subtotal)
		}


		mandar(carrito){

			console.log(carrito)
			this.objetos.subtotal = self.subtotal
			$localStorage.carrito = carrito
			$state.go('compras.direccion')
		}
	}

	class item {
		constructor(arg){
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
		}

		eliminar(idx){
			console.log(this)

			self.subtotal = self.subtotal - this.precio

			self.carrito.objetos.splice(this, 1)
			$scope.$digest()



		}
	}

	self.carrito = new carrito_()


});
