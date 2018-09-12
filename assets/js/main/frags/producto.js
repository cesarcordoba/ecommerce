angular.module('myapp')
.controller('productoCtrl', function($scope, $stateParams, $localStorage, $window,  Marca, Producto, Version, Gama, Ambiente, Oferta ) {

    const
        self = this,
        id = $stateParams.id
        bolsita = [];
    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.marca()
            this.versiones()
            this.ObtenerImagenes()
            this.ObtenerGama()
            this.focus = false
            this.forma = {
                width : 2,
                height : 5
            }
        }

        ObtenerImagenes(){
            Producto.imagenes(this.id)
            .then(response => this.imagenes = response.data)

            .then(() => $scope.$digest())
            .then(() => this.slider())
        }

        ObtenerGama(){
            if(!_.isNull(this.IdGama))
                Gama.one(this.IdGama)
                .then(response => this.gama = new gama_(response.data))
                .then(() => $scope.$digest())
        }

        marca(){
            if(!_.isNull(this.IdMarca))
                Marca.one(this.IdMarca)
                .then(response => this.marca = response.data)
        }

		versiones(){
            Producto.versionesdisponibles(this.id)
            .then(response => this.versiones = response.data.map(n => new version_(n)))

        }
        slider(){

			$( '#central' ).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				fade: true,
				asNavFor: '#slider'
			})

			$( '#slider' ).slick({
				slidesToShow: this.imagenes.length + 1,
				slidesToScroll: this.imagenes.length + 1,
				asNavFor: '#central',
				dots: true,
				focusOnSelect: true,
                vertical: true,
			})

		}
        resize(x){

            if(!_.isUndefined(this.imagenes)){
                if(this.imagenes.length === 0)
                    $("#slider img").css({"height" : "auto", "width" : "100%" })
                if(this.imagenes.length > 0)
                    $("#slider img").css({"width" : "auto", "height" : "100%" })
            }
        }
        ir(){
			$window.open('#/producto/' +  this.id )
        }

        agregaACarrito(producto){

            console.log(producto)

            bolsita.push(producto)
            $localStorage.bolsa = bolsita
            console.log($localStorage.bolsa)

        }

    }

    class version_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.opciones()
            this.colores()
            // this.precio()
            this.obtenerOfertas()
            console.log(this)
        }
        obtenerOfertas(){
            Version.entrantes(this.id)
            .then(entrante => {

                Promise.all(
                        entrante.data.map(n =>
                            Oferta.salientes(n.entrantes.IdOferta).then(res =>
                                res.data )))
                .then(saliente =>
                        this.ofertas = new Object({
                        entrantes : entrante.data,
                        salientes : saliente
                }))
                .then(() => $scope.$digest())
            })
        }
        opciones(){
            Version.opciones(this.id)
            .then(response => this.opciones = response.data)
            .then(() => $scope.$digest())
        }
        colores(){
            Version.colores(this.id)
            .then(response => this.colores = response.data)
            .then(() => $scope.$digest())
        }
        precio(){
            // Version.precio(this.id)
            // .then(response => {
            //     // this.descuento = response.data.descuento
            //     this.precio = response.data
            //     // if(this.descuento.cantidad > 0)
            //     //     this.oferta = true
            // })
            // .then(() => $scope.$digest())
        }
    }

	class gama_ {
		constructor(arg) {
			Object.entries(arg).forEach(n => this[n[0]] = n[1])
			this.productos()
		}
		productos(){
			Gama.productos(this.id)
			.then(response => this.productos = response.data.map(n => n.id !== Number(id) ? Object.assign(n , {status : true}) : n))
			.then(() => $scope.$digest())
		}
	}

    Producto.ambientes(id)
    .then(response => self.ambientes = new ambientes_(response.data))
    .then(() => $scope.$digest())

    class ambientes_ {
        constructor(arg) {
            this.items = arg.map(n => new ambiente_(n))
            this.relacinados()
        }
        relacinados(){
            if(self.producto.IdGama)
                Ambiente.gama(self.producto.IdGama)
                .then(response =>
                    this.items = response.data.reduce((ac, v) =>
                        this.items.reduce((ac, i) =>
                            ac === true ? true : _.isEqual(i.id, v.id), false) ? ac : ac.concat(new ambiente_(v))
                    , this.items))
                .then(() => $scope.$digest())
                .then(() => $('.ambientes').slick({
                  dots: true
              }))
		}
    }

    class ambiente_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerEspacio()
        }
		obtenerEspacio(){
            Ambiente.espacio(this.id)
            .then(response => this.espacio = response.data)
            .then(response => console.log(response))
            .then(() => $scope.$digest())
        }
    }

	class alternativas_ {
		constructor(producto) {
			this.filtros = {
				pagina : 1,
				limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  6 :  3,
				order : ['nombre'],
				where : [
                    { status : 1 },
                    { IdCategoria : producto.IdCategoria }
                ],
				include : []
			}
            this.obtener()
		}
		obtener(){

			Producto.filtro(this.filtros)
			.then(response => {
				this.items = response.data.items ? response.data.items  : null
				this.filtros.paginas = response.data.paginas
                console.log(self.alternativas.items)
			})
			.then(() => $scope.$digest())
            .then(() => this.slider())


		}

        slider(){
            $(".alternativas-slider-container").slick({
                infinite: true,
                speed: 300,
                slidesToShow: 2,
                adaptiveHeight: true,
                infinite: true,
                arrows: true
            })
        }
	}


    Producto.one(id)
    .then(response => self.producto = new producto_(response.data))
    .then(response => self.alternativas = new alternativas_(response))
    .then(() => $scope.$digest())

    console.log(self)

});
