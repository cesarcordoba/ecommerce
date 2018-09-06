var app = angular.module('myapp');

app.controller('homeCtrl', function(Categoria, $scope, $rootScope, $mdDialog, $window, Producto, Version) {

	const self = this

	class menu_{
		constructor(){}

		abrir(){
			$mdDialog.show({
                templateUrl: '/dialogs/menu-opciones',
                parent: angular.element(document.body),
                bindToController: true,
                preserveScope: true,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog,$state) {
                    // $scope.submit = function(tarjeta) {
					//
                    //     console.log(tarjeta)
                    // }
                    $scope.close = function() {
                        $mdDialog.hide(false);
                    }
                }
            })
		}
	}

	self.menu = new menu_();

	class promociones_{
		constructor(){
			this.items = [],
			this.obtener()
		}

		obtener(){
			let promos = [{promo: 1}, {promo: 2},{promo: 3}, {promo: 4}]
			this.items = promos;

			function Prueba(){

				$(".promocion-slider-container").slick({
					infinite: true,
					speed: 300,
					slidesToShow: 1,
					adaptiveHeight: true,
					dots: true,
					infinite: true,
					autoplay: true,
					autoplaySpeed: 3000
				})
			}
			setTimeout(Prueba, 30)
		}
	}

	self.promociones = new promociones_();

	class categorias_{
		constructor(){
			this.items = [],
			this.obtener()
		}

		obtener(){
			let categorias = [
				{nombre: 'materiales electricos'},
				{nombre: 'aceros'},
				{nombre: 'pisos'},
				{nombre: 'azulejos'},
				{nombre: 'tinacos'},
				{nombre: 'cisternas'},
				{nombre: 'pvc'},
				{nombre: 'herramientas'},
				{nombre: 'paneles'},
				{nombre: 'mangueras'},
				{nombre: 'puertas y ventanas'},
				{nombre: 'tornilleria'},
				{nombre: 'bombas'},
				{nombre: 'lamina'},
				{nombre: 'fierro comercial'},
				{nombre: 'griferia'},
				{nombre: 'muebles de baño'},
				{nombre: 'materiales de construccion'}
			]
			this.items = categorias;
			function cargarSlick(){

				$(".categorias-slider-container").slick({
					infinite: true,
					speed: 300,
					slidesToShow: 5,
					adaptiveHeight: true,
					infinite: true,
					arrows: true
				})
			}
			setTimeout(cargarSlick, 30)
		}
	}

	self.categorias = new categorias_();

	// class ofertas_ {
	// 	constructor(arg) {
	// 		this.filtros = {
    //             pagina : 1,
	// 			promo : true,
    //             limite : (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))  ?  9 :  3,
    //             order : ['createdAt'],
    //             where : [
    //                 { status : 1 }
    //             ],
    //             include : []
    //         }
	// 	}
	// 	obtener(){
	//
    //         Producto.filtro(this.filtros)
    //         .then(response => {
    //             this.items = response.data.items ? response.data.items.map(n => new producto_(n)) : null
    //             this.filtros.paginas = response.data.paginas
    //         })
    //         .then(() => $scope.$digest())
	// 		.then(() => $( '#4').slick({
	//
	// 			dots: true,
	// 			infinite: true,
	// 			speed: 300,
	// 			slidesToShow: 3,
	// 			slidesToScroll: 3,
	// 			variableWidth: true,
	// 			// autoplay: true,
	// 			// autoplaySpeed: 2000
	// 		}))
    //     }
	// }
	//
	// class producto_ {
	// 	constructor(arg) {
	// 		Object.entries(arg).forEach(n => this[n[0]] = n[1])
	// 	}
	// }
	//
	//
	//
	// self.ofertas = new ofertas_()
	// self.ofertas.obtener()
	//
	// class categorias_ {
	// 	constructor(item, key) {
	// 		this.nombre = item.nombre
	// 		this.key = key
	// 		this.items = item.datos.data.map(n => new categoria_(n))
	// 	}
	// 	slider(){
	// 		$( '#' + this.key ).slick({
	// 			dots: true,
	// 			infinite: true,
	// 			speed: 300,
	// 			slidesToShow: 1,
	// 			variableWidth: true
	// 		})
	// 	}
	// }
	//
	// class categoria_ {
	// 	constructor(arg) {
	// 		Object.entries(arg).forEach(n => this[n[0]] = n[1])
	// 		this.ultimoproducto()
	// 	}
	// 	ultimoproducto(){
	// 		Categoria.ultimoproducto(this.id)
	// 		.then(async (response) => new Object( { producto : response.data , portada :  !_.isNull(response.data) ? await Producto.portada(response.data.id).then(response => response.data) : null } ))
	// 		.then(response => this.item = response)
	// 		.then(() => $scope.$digest())
	// 	}
	// }
	//
	// const modulos = [ { nombre: 'Pisos y Azulejos',  numero : 1 }, { nombre :  'Muebles de Baño'  ,numero : 2 }]
	//
	// Promise.all(
	// 	modulos.map(async (n) => Object.assign(n, { datos : await Categoria.subcategorias(n.numero)}))
	// )
	// .then(response => self.modulos = response.map((n, key) => new categorias_(n, key)))
	// .then(() => $scope.$digest())
	// .then(() => self.modulos.forEach(n => n.slider()))
	//
	//
	// console.log(self)

});
