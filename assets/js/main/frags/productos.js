var app = angular.module('myapp');

app.controller('productosCtrl', function($scope, $localStorage, $state, $mdExpansionPanel, $mdDialog, $window, Marca, Producto, Version, Atributo, Resolucion, Categoria, Marca , Color ) {

    const
        self = this


    $mdExpansionPanel().waitFor('precios').then(function (instance) {
        instance.expand();
    });

    class categorias_ {
        constructor( arg ) {
            this.items = [ new categoria_(arg, 1, null) ]
            this.respaldo = []
            this.ordenar()
        }
        ordenar(){

            if($localStorage.mainpeticion && $localStorage.mainpeticion.categoria){

                var arraynuevo = [ $localStorage.mainpeticion.categoria ]



                function buscar( array, categoria ){
                    let buscado = array.find(n =>  n.id ===  categoria.IdCategoria )
                    if(!_.isUndefined(buscado)) arraynuevo.push(buscado), buscar(array, buscado)
                    else arraynuevo = arraynuevo.reverse()
                }

                Categoria.obtener()
                .then(response => {

                    this.todos = response.data

                    buscar( response.data, $localStorage.mainpeticion.categoria )

                    this.respaldo = arraynuevo.map(n => n.id)

                    arraynuevo.forEach((n, key) => {
                        self.modulos.obtener(n.id)
                        if(n.nivel !== 1){
                            this.items.push( new categoria_(null, this.items.length + 1, n))
                        }else{
                            this.items[0].item = n
                        }
                    })

                })
                .then(() => Categoria.subcategorias($localStorage.mainpeticion.categoria.id))
                .then(response => {
                    if(response.data.length > 0)
                        this.items.push( new categoria_(response.data, this.items.length + 1, null ))
                })
                .then(() => $scope.$digest())
                .then(() => $scope.$digest())
            }
        }
        imprimir(){
            console.log(this)
        }
        seleccionar(nivel, id){

            let categoria = this.items.find(n => n.nivel === nivel )
            self.productos.filtros.pagina = 1

            if(!_.isNull(categoria.item)) {

                console.log('agregar')

                this.respaldo.push(id)

                self.productos.filtros.categoria = categoria.item


                self.productos.filtros.pagina = 1
                self.productos.obtener()

                Categoria.subcategorias(categoria.item.id)
                .then(response => {
                    if(response.data.length > 0)
                        this.items.push( new categoria_(response.data, this.items.length + 1, null )),
                        self.modulos.obtener(categoria.item.id)
                })
                .then(() => $scope.$digest())

            } else {

                let eliminada = this.respaldo.reduce((ac, v)=> {
                    if(this.items.filter(n => n.item).map(n => n.item.id).includes(v) === false) return v
                }, null)

                this.respaldo.splice(this.items.indexOf(eliminada), 1)

                self.modulos.items.filter(n => n.categoria && n.categoria.id === eliminada).forEach(n => {
                    self.modulos.items.splice(this.items.indexOf(eliminada), 1)
                })

                self.productos.sincronizarOpciones()

                this.items.filter(n => n.nivel > nivel)
                .forEach(n => this.items.splice(this.items.indexOf(n), 1))

                let ultimo = this.items.filter(n => n.item)

                if(ultimo.length === 0)
                    delete self.productos.filtros.categoria
                else
                    self.productos.filtros.categoria = ultimo.pop().item

                self.productos.obtener()
            }
        }
        insertar( categorias , categoria ){
            this.items.push( new categoria_(categorias, this.items.length + 1, categoria))
        }
    }

	class categoria_ {
		constructor(categorias, nivel, categoria) {
            this.item = categoria
            this.nivel = nivel
            this.items = !_.isNull(categorias) ? categorias : null
		}
        async filtrar() {
            return !_.isNull(this.items)?
                this.items.filter(n =>
                    n.nombre.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1)
                :
                this.items = await Categoria.subcategorias(self.categorias.todos.find(n => n.id === this.item.IdCategoria).id).then(res => res.data)
        }
        subcategorias(){
            Categoria.subcategorias(self.categorias.todos.find(n => n.id === this.item.IdCategoria).id)
            .then(response => this.items = response.data )
            .then(() => $scope.$digest())
        }
	}

    class modulos_ {
        constructor(arg) {
            this.items = arg
        }
        obtener(categoria){
            Categoria.atributos(categoria)
            .then(response => Promise.all(
                response.data.map(async (n) => new modulo_( await Atributo.opciones(n.id), n.nombre, 2, await Categoria.obtener().then(res => res.data.find(n => n.id === categoria))))))
            .then(response => Modulos(response, $localStorage.mainpeticion.categoria))
            .then(() => $scope.$digest())
        }
    }

    class modulo_ {
        constructor(items, nombre, tipo = 1, categoria) {
            this.tipo = tipo
            this.nombre = nombre
            this.items = items.data.map(n => new opcion_(n))
            this.categoria = categoria ? categoria : null

            if(this.tipo === 1 && $localStorage.mainpeticion[ this.nombre ]){
                $localStorage.mainpeticion[this.nombre].forEach(n => {
                    this.items.forEach(o => {
                        if(n === o.id){
                            o.check = true
                        }
                    })
                })
            }
            if(this.tipo === 2 && $localStorage.mainpeticion.opcion){
                $localStorage.mainpeticion.opcion.forEach(n => {
                    this.items.forEach(o => {
                        if(n === o.id){
                            o.check = true
                        }
                    })
                })
            }

            if(this.tipo)
                $mdExpansionPanel().waitFor(this.nombre)
                .then(instance => instance.expand())
        }
    }

    class opcion_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        cambio(modulo){
            self.productos.filtros.pagina = 1
            if(modulo.tipo === 2){
                if(self.productos.filtros.opcion )
                    self.productos.sincronizarOpciones(),
                    self.productos.obtener()
                else
                    self.productos.filtros.opcion = [ this.id ]
            }else{
                if(self.productos.filtros[modulo.nombre]){
                    self.productos.filtros[modulo.nombre] = self.modulos.items.find(n => n.nombre === modulo.nombre).items.filter(n => n.check).map(n => n.id)
                    if(self.productos.filtros[modulo.nombre].length === 0)
                        delete self.productos.filtros[modulo.nombre]
                    self.productos.obtener()
                }else
                    self.productos.filtros[modulo.nombre] = [ this.id ]
            }
        }
    }

    function Modulos(modulos, categoria){
        if(self.modulos){
            self.modulos.items = self.modulos.items.filter(n => !_.isUndefined(categoria) && n.categoria ? (n.tipo === 1  || categoria.nivel > n.categoria.nivel ) :  n.tipo === 1 )
            modulos.forEach(modulo =>  self.modulos.items.push(modulo))
        }else
            self.modulos = new modulos_(modulos)
        $scope.$digest()
    }

    Promise.all([
            { nombre : 'Marcas', servicio : Marca },
            { nombre : 'Colores', servicio : Color }
        ].map(async(n) =>
            new modulo_( await n.servicio.disponibles(), n.nombre, 1 )))
    .then(response => Modulos(response))
    .then(() => $scope.$digest())

	class productos_ {
        constructor(arg) {
            this.items = []
            this.filtros = !_.isUndefined(arg) ? arg : this.filtro()
            this.col = {  xs : 10, sm : 8, md : 10, lg : 12, xl : 14}
            this.gutter = '0px'
            this.height = { xl : '30px', lg : '30px', md : '30px', xs : '30px', sm : '30px' }
            if(arg && arg.nombre)
                this.busqueda = arg.nombre
        }
        sincronizarOpciones(){
            let opciones = _.flatten(self.modulos.items.filter(n => n.tipo === 2).map(n => n.items.filter(n => n.check))).map(n => n.id)
            if(opciones.length > 0)
                self.productos.filtros.opcion = opciones
            else
                delete self.productos.filtros.opcion
        }
        filtro(){
            return this.filtros = {
                pagina : 1,
                limite : (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))  ?  20 :  3,
                order : ['createdAt'],
                where : [
                    { status : 1 }
                ],
                include : []
            }
            self.modulos.forEach(n => n.item = null)
        }
        obtener(){


            delete this.items

            this.procesando = true

            Producto.filtro(this.filtros)
            .then(response => {

                console.log(response)

                this.procesando = false

                $localStorage.mainpeticion = this.filtros

                this.items = response.data.items ? response.data.items.map(n => new producto_(n)) : []

                if(!response.data.items)
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('No existen Productos con los requerimientos seleccionados')
                        .textContent('Selecciona otros filtros')
                        .ok('Ok')),
                    delete this.items

                this.filtros.paginas = response.data.paginas

            })
            .then(() => $scope.$digest())

        }
    }


    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.focus = false
            this.default()
        }
        default(){
            this.focus = false
            this.forma = {
                width : 2,
                height : _.isUndefined(this.versiones) ? 25 : (40 + $('md-grid-tile' ).width() + $('.titulo' ).height() + (30 * this.versiones )) /  parseFloat(self.productos.height[Resolucion.obtener()])
            }
        }
        expand(){

            this.conexion()
        }
        conexion(){

            this.forma.height = (40 + $('md-grid-tile').width() + $('.titulo' ).height() + (30 * this.versiones )) /  parseFloat(self.productos.height[Resolucion.obtener()])

        }


    }

    $scope.print = () => {
        console.log(this)
    }

    self.productos = $localStorage.mainpeticion ? new productos_( $localStorage.mainpeticion ) :  new productos_()

    $scope.conexion = (x, idx) => self.productos.items[idx].conexion()

    var index = 0


    $scope.resize = (x, idx) => {
        if(self.productos.items){
            self.productos.items[idx].versiones = x
            index++
            if(index === self.productos.filtros.limite){
                self.productos.items.forEach(n => n.conexion())
                $scope.$digest()

            }
            console.log(self.productos.items)
        }
    }

    function sliderVersiones(){

        console.log('si estas aqui')
        $(".versiones-slider-container").slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            infinite: true,
            arrows: true
        })
    }
    Atributo.obtener()
    .then(response => self.atributos = response.data)
    .then(response => $scope.$digest())

    Categoria.nivel(1)
    .then(response => self.categorias = new categorias_(response.data))
    .then(() => $scope.$digest())

    $(window).on("resize", function() {
        if(self.productos.items)
            self.productos.items.forEach(n => n.conexion())
        // self.productos.resize()
    });

});
