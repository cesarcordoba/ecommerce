angular.module('myapp')
.controller('pagoCtrl', function($scope, $localStorage, $state, $mdDialog, Orden) {
    const self = this;

    var productos = $localStorage.carrito;
    var usuario = $localStorage.usuario;

    OpenPay.setId('m5zjhjbrhxcvutm3mqmx');
    OpenPay.setApiKey('pk_5972f328b5794e79a85b13ea92b528e0');
    OpenPay.setSandboxMode(true);
    //Se genera el id de dispositivo
    var deviceSessionId = OpenPay.deviceData.setup("formulario-pagos", "token_id");

    class pagos_{
    	constructor(){
    		this.tarjetas = [],
    		this.cargarTarjetas();
    	}
    	cargarTarjetas(){
    		this.tarjetas =  [
				{
					numero: "Visa terminanción *****1234",
					nombre: "Juan Pérez",
					expiracion: "10/2020"
				},
				{
					numero: "Visa terminanción *****1234",
					nombre: "cesar cordoba",
					expiracion: "10/2020"
				},
				{
					numero: "Visa terminanción *****1234",
					nombre: "alejandro vela",
					expiracion: "10/2020"
				},
				{
					numero: "Visa terminanción *****1234",
					nombre: "No hay mas nombres",
					expiracion: "10/2020"
				}
			].map(n => new item(n));
    	}

    	seleccionar(tarjeta){
    		console.log(tarjeta)
    		productos.tarjeta = tarjeta;
			console.log(productos)
    	}

    	terminarCompra(){

    		$localStorage.carrito = productos;
    		$state.go('compras.confirmacion')
    	}

    	nuevoMetodo(){
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

        mandarPago(tarjeta){
            tarjeta.device_session_id = deviceSessionId;
            tarjeta.pago = productos.subtotal;
            self.tarjeta = tarjeta;
            console.log(tarjeta)
            OpenPay.token.create(tarjeta, this.successToken, this.errorToken);


        }

        successToken(response){
            console.log(response)
            //

        let chargeRequest = {
            source_id : response.data.id,
            method : 'card',
            amount :  self.tarjeta.pago,
            currency : 'MXN',
            description : 'compra de articulos',
            order_id : '3',
            device_session_id : deviceSessionId,
            send_email: true,
            redirect_url: 'localhost:5000/#/perfil/historial',
            customer : {
                    name : response.data.card.holder_name,
                    last_name : response.data.card.holder_name,
                    email : usuario.correo
                }
            }

            console.log(chargeRequest)
            Orden.openpayService(chargeRequest).then(res => console.log(res.data))

        }
        errorToken(){

        }
    }

    class item {
    	constructor(arg){
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
    	}
    }

    self.pagos = new pagos_();

});
