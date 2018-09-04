angular.module('myapp')

.controller('promocionCtrl', function($scope, $stateParams, $mdDialog,  Promocion, Producto, Oferta, Descuento) {

    const
        self = this,
        id = $stateParams.id

    function buscar(){
		return new Promise((resolve, reject) =>
			$mdDialog.show({
				templateUrl: '/partialsadmin/buscarProducto',
				parent: angular.element(document.body),
				bindToController: false,
				locals : {},
				preserveScope: false,
				fullscreen: true,
				clickOutsideToClose: true,
				controllerAs: 'ctrl',
				controller: function ( $scope, $mdDialog, Producto ) {

					class productos_ {
				        constructor() {}
				        async seleccion(){
                            this.versiones = await Producto.versiones(this.item.id)
                            .then(response => response.data)
                            await $scope.$digest()
				        }
				        buscar(){
				            console.log('cambio')
				        }
				        async filtrar(text){
				            console.log(text)
				            return await Producto.busqueda({nombre : text })
				            .then(response => response.data )
				        }
                        listo(){
                            $mdDialog.hide(this.versiones.find(n => n.check))
                        }
				    }

					this.productos = new productos_()

				}
			})
			.then(response => resolve(response))
		)
	}

    function cantidad(response){
        return new Promise((resolve , reject) => {
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un nuevo Nivel?')
                    .textContent('Empieza por introducir su titulo')
                    .placeholder('Titulo del nivel')
                    .ok('Aceptar')
                    .cancel('Cancelar')
                )
                .then(result => resolve([response, result]))
        })
    }

    class promocion_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtener()
        }
        obtener(){
            this.Obtenerproductos()
            this.Obtenerdescuentos()
            this.Obtenerofertas()
        }
        async ligarProducto(){
            console.log('si')
            await Promocion.ligarproducto(this.id, self.productos.item.id)
            await this.Obtenerproductos()
        }
        async Obtenerproductos(){
            this.productos = await Promocion.productos(this.id)
                .then(response => response.data)
            await $scope.$digest()
        }
        async Obtenerdescuentos(){
            this.descuentos = await Promocion.descuentos(this.id)
                .then(response => new descuentos_(response.data))
            await $scope.$digest()
        }

        async Obtenerofertas(){
            this.ofertas = await Promocion.ofertas(this.id)
                .then(response => new ofertas_(response.data))
            await $scope.$digest()
        }
    }

    class ofertas_ {
        constructor(arg) {
            this.items = arg.map(n => new oferta_(n))
        }
        crear(){
            Oferta.crear({IdPromo : id})
            .then(() => this.obtener())
        }
        obtener(){
            Oferta.obtener()
            .then(response => this.items = response.data.map(n => new oferta_(n)))
            .then(() => $scope.$digest())
        }
    }

    class oferta_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.Obtenersalientes()
            this.Obtenersentrantes()
        }
        async Obtenersalientes(){
            this.salientes = await Oferta.salientes(this.id)
                .then(response => response.data)
            await $scope.$digest()
        }
        nuevoentrate(){
            buscar()
            .then(response => cantidad(response))
            .then(response => Oferta.nuevoentrante({IdOferta : this.id, IdVersion: response[0].id, cantidad : response[1]}))
            .then(() => this.Obtenersentrantes())
        }
        nuevosaliente(){
            buscar()
            .then(response => cantidad(response))
            .then(response => Oferta.nuevosaliente({IdOferta : this.id, IdVersion: response[0].id, cantidad : response[1]}))
            .then(() => this.Obtenersalientes())
        }
        async Obtenersentrantes(){
            this.entrantes = await Oferta.entrantes(this.id)
                .then(response => response.data)
            await $scope.$digest()
        }
        eliminarSaliente(id){
            Oferta.eliminarsaliente(id)
            .then(() => this.Obtenersalientes())
        }
        eliminarEntrante(id){
            Oferta.eliminarentrante(id)
            .then(() => this.Obtenersentrantes())
        }
        eliminar(idx){
            Oferta.eliminar(this.id)
            .then(() => self.promocion.ofertas.items.splice(idx, 1))
            .then(() => $scope.$digest())
        }
    }

    class descuentos_ {
        constructor(arg) {
            this.items = arg.map(n => new descuento_(n))
        }
        obtener(){
            Promocion.descuentos(id)
            .then(response => this.items = response.data.map(n => new descuento_(n)))
            .then(() => $scope.$digest())
        }
        crear(){
            cantidad()
            .then(response => Descuento.crear({IdPromo : id, cantidad : response[1]}))
            .then(() => this.obtener())
        }
    }

    class descuento_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerVersiones()
        }
		ligarVersion(){
            buscar()
            .then(response => Descuento.ligarversion(this.id, response.id))
            .then(() => this.obtenerVersiones())
		}
        obtenerVersiones(){
            Descuento.versiones(this.id)
            .then(response => this.versiones = response.data)

            .then(() => $scope.$digest())
        }
        eliminar(idx){
            Descuento.eliminar(this.id)
            .then(() => self.promocion.descuentos.items.splice(idx, 1))
            .then(() => $scope.$digest())
        }
    }

    class productos_ {
        constructor() {}
        seleccion(){
            console.log('seleccion')
        }
        buscar(){
            console.log('cambio')
        }
        async filtrar(text){
            return await Producto.busqueda({nombre : text })
            .then(response => response.data )
        }
    }

    Promocion.one($stateParams.id)
    .then(response => self.promocion = new promocion_(response.data))
    .then(() => $scope.$digest())


    self.productos = new productos_()
    console.log(self)

});
