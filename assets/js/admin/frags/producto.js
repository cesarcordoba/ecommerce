angular.module('myapp')
.controller('productoCtrl', function($scope, $state, $stateParams, anchorSmoothScroll, $mdDialog, $mdPanel, $mdExpansionPanelGroup, $mdExpansionPanel,
    Producto, Categoria, Atributo, Linea, Marca , Color, Ambiente, Gama, Portada, Imagen, Version, Espacio, Inventario, Observacion, Existencia, Precio, Descuento) {

    const
        self = this,
        id = $stateParams.id


    $('.dropify').dropify({
        messages: {
            default: 'Agregar',
            replace: 'Reemplazar',
            remove: 'Eliminar',
            error: 'Error'
        }
    }).on('change', function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = e =>
                $scope.$apply(() =>
                    self.imagen.input = e.target.result)

            reader.readAsDataURL(this.files[0]);
        }
    })

    self.info = (ev) => {
        $mdPanel.open({
        attachTo: angular.element(document.body),
        clickOutsideToClose: true,
        position: $mdPanel.newPanelPosition()
            .absolute()
            .top(ev.pageY  + 'px')
            .left(ev.pageX - 180 + 'px'),
        controllerAs: 'ctrl',
        controller: function(mdPanelRef) {},
        template: `
            <md-card><md-card-content>
                <p> 1 (completo) </p>
                <p> 2 (falta revisión) </p>
                <p> 3 (falta imagen) </p>
                <p> 4 (falta versiones) </p>
                <p> 5 (falta atributos) </p>
            </md-card-content></md-card>
        `})
    }



    class imagenes_ {
        constructor(array) {
            console.log(array)
            this.editar = false
            this.portada = !_.isNull(array[0]) ? new imagen_(array[0]) : null
            this.imagenes = array[1].map(n => new imagen_(n))
        }
        limpiar(){
            delete this.output
            delete this.input
            return false
            $(".dropify-clear").trigger("click")
            $scope.$digest()
        }
        crearPortada(){

            Portada.crear({imagen : self.imagen.output, IdProducto : id })
			.then(response => this.portada = new imagen_(response.data))
            .then(() => this.limpiar())
            .then(() => $scope.$digest())

        }
        crearImagen(){

            Imagen.crear({imagen : self.imagen.output, IdProducto : id })
            .then(response => this.imagenes.push(new imagen_(response.data)))
            .then(() => this.limpiar())
            .then(() => $scope.$digest())
        }
        eliminarImagen(id, idx){

            Imagen.eliminar(id)
            .then(() => this.imagenes.splice(idx, 1))
            .then(() => $scope.$digest())

        }
        eliminarPortada(){

            Portada.eliminar(this.portada.id)
            .then(() => delete this.portada)
            .then(() => $scope.$digest())

        }
    }

    class imagen_ {
        constructor(arg) {
            if(arg)
                Object.entries(arg).forEach(n => this[n[0]] = n[1])
            if(_.isNull(arg.imagen))
                this.obtenerImagen()
            else
                this.tamano()

            console.log(arg)
        }
        async obtenerImagen(){
            Imagen.one(this.id).then(response => {
                this.imagen = response.data.imagen
            })
            .then(() => this.tamano())
            .then(() => $scope.$digest())
        }
        tamano(){
            if(this.imagen)
                this.size = this.imagen.length / 1024
        }
    }

    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerCategoria()
            this.obtenerVersiones()
            this.obtenerAmbientes()
        }
        fijarCategoria(){
            self.categorias.item = self.categorias.items.find(n => this.IdCategoria === n.id)
        }
        editar(){
            Producto.editar(this)
        }
        obtenerCategoria(){

            if(!_.isNull(this.IdCategoria))
                Categoria.one(this.IdCategoria)
                .then(response => this.categoria = new categoria_(response.data))
                .then(() => $scope.$digest())

        }
        obtenerVersiones(){
            Producto.versiones(id)
            .then(response => self.versiones = new versiones_(response.data))
            .then(() => self.versiones.items[0].sincronizar())
            .then(() => $scope.$digest())
        }

        obtenerAmbientes(){
            Producto.ambientes(id)
            .then(response => this.ambientes = response.data.map(n => new ambiente_(n)))
            .then(() => $scope.$digest())
        }


        eliminar(){

            $mdDialog.show($mdDialog.confirm()
                .title('¿Seguro que quieres eliminar la area?')
                .textContent('Para eliminar de forma permanente dale en aceptar')
                .ok('Aceptar')
                .cancel('Cerrar')
                .clickOutsideToClose(true)
            ).then(() => Producto.eliminar(this.id))
            .then(() => $state.go('articulos.productos'))
        }

        crearAmbiente(){
            $mdDialog.show($mdDialog.confirm()
                .title('¿Seguro que quieres crear un Ambiente')
                .textContent('Se creará y se ligara con este producto')
                .ok('Aceptar')
                .cancel('Cerrar')
                .clickOutsideToClose(true)
            ).then(() => Ambiente.crearYligar(this.id))
            .then(response => $state.go('ambiente', {id: response.data.id}))
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
            .then(() => $scope.$digest())
        }

        ir(){
            $state.go('ambiente', {id: this.id})
        }
    }

    class categoria_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.atributos()
        }
        atributos(){

            Categoria.atributos(this.id)
            .then(response => self.atributos = response.data.map(n => new atributo_(n)) )
            .then(() => $scope.$digest())

        }
    }

    class atributo_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.opciones()
        }

        opciones(){
            Atributo.opciones(this.id)
            .then(response => this.opciones = response.data)
            .then(() => $scope.$digest())
        }
    }

    class _modulo {
        constructor(arg, nombre) {
            this.nombre = nombre
            this.servicio = arg
        }
        async itemcito(producto){

            let obj = Object.entries(producto).find(n => n[0] === ('Id' +  _.capitalize(this.nombre)))

            if(!_.isNull(obj[1])){

                this.ejemplos(obj[1])

                this.item = await this.servicio.one(obj[1])
                .then(response => response.data)

            }
        }
		ejemplos(id){
            this.servicio.productos(id)
            .then(response => this.ejemplos = response.data)
            .then(() => $scope.$digest())

		}
        seleccion(){
            if(this.item)
                Producto['ligar' +  this.nombre](id, this.item.id)

        }
        buscar(){}
        async filtrar(text) {
            return text.length > 1 ?
                this.items.filter(n =>
                    n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
                :
                this.items = await this.obtener()
        }
        async obtener(){
            return await new Promise((resolve) => {
                this.servicio[  this.nombre === 'marca' ? 'obtener' : 'xMarca'  ](self.producto.IdMarca)
                .then(response => resolve(response.data))

            })
        }
        crear(initialValue){
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un ' + this.nombre + ' ?')
                    .textContent('Empieza por introducir su nombre')
                    .initialValue(initialValue)
                    .placeholder(this.nombre)
                    .ok('Aceptar')
                    .cancel('Cancelar')
            )
            .then(response => this.servicio.crear(Object.assign({ nombre : response}, this.nombre === 'marca' ? {} : {IdMarca : self.producto.IdMarca  }    )))
            .then(response => {
                Producto['ligar' +  this.nombre](id, response.data.id)
                this.items.push(response.data)
            })
            .catch(() => { })
        }
    }

    class versiones_ {
        constructor(arg) {
            this.items = arg.map(n => new version_(n))
            if(!_.isNull($stateParams.version))
                anchorSmoothScroll.scrollTo('versiones')
            this.seleccionado = $stateParams.version !== 'null' ? arg.findIndex(n => n.id === Number($stateParams.version)) : 0
            this.items[this.seleccionado].obtener()
        }
        ir(id){
            this.seleccionado = this.items.findIndex(n => n.id === id)
        }
        crear(){
            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear una versión?')
                    .textContent('Empieza por introducir su nombre')
                    .placeholder('Nombre de la versión')
                    .ok('Aceptar')
                    .cancel('Cancelar')
            )
            .then(response => Version.crear({ nombre : response, IdProducto : id}))
            .then(response => this.items.push(new version_(response.data)))
            .then(() => $scope.$digest())
        }

        modificar(){

            $mdDialog.show({
                templateUrl: '/partialsadmin/modificarVersiones',
                parent: angular.element(document.body),
                bindToController: false,
                locals : {
                    versiones : this.items,
                    atributos : self.atributos
                },
                preserveScope: false,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ( $scope, $mdDialog, versiones, atributos, Version ) {

                    const self = this

                    class versiones_ {
                        constructor(arg) {
                            this.items = versiones.map(n => new version_(n) )

                        }
                        seleccionar(){

                            this.items.forEach(n => n.check = true)

                        }
                        aceptar(){
                            Version.procesar(this.items.filter(n => n.check).map(n => n.procesar()))
                            // .then(response => $mdDialog.hide())
                            // $mdDialog.hide()
                        }
                    }

                    class version_ {
                        constructor(arg) {
                            Object.entries(arg).forEach(n => this[n[0]] = n[1])
                            this.palabras = arg.nombre.split(' ')
                            this.check = false
                        }
                        procesar(){
                         return new Object({
                            version : this.id,
                            nombre : this.palabras.filter((n, key) => self.accion.items[key] ? self.accion.items[key].nombre === 'nada' ? n : null : n).filter(n => n !== null).join(' '),
                            palabras : this.palabras.map((n, key) => new Object({
                                    palabra : n,
                                    accion : self.accion.items[key]
                                })).filter(n => n.accion && n.accion.nombre === 'atributo' || 'color')
                            })

                        }
                    }

                    class accion_ {
                        constructor() {
                            this.item = {}
                            this.items = []
                        }
                        agregar(){

                            if(this.item.nombre === 'atributo')
                                this.item = new Object({
                                    nombre : this.item.nombre,
                                    atributo : this.item.atributo.nombre,
                                    id : this.item.atributo.id
                                })

                            this.items.push(this.item)
                            this.item = {}

                        }
                        eliminar(idx){
                            this.items.splice(idx, 1)
                            $scope.$digest()
                        }
                    }

                    self.accion = new accion_()
                    self.versiones = new versiones_(versiones)
                    self.atributos = atributos

                }
            })
            .then(response => self.producto.obtenerVersiones())
        }

    }

    class version_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        obtener(){
            this.Contarsucursales()
            this.Obtenersucursales()
            this.obtenerColores()
			this.sincronizar()
            this.color = {
                item : {},
                ligar : () => Color.addVersion(this.color.item.id, this.id)
                    .then(response => this.colores.push(this.color.item))
                    .then(() => $scope.$digest()),
                desligar : (color, idx) => Color.removeVersion(color.id, this.id)
                    .then(() => this.colores.splice(idx ,1))
                    .then(() => $scope.$digest())
            }
        }

        obtenerColores(){

            Version.colores(this.id)
            .then(response => this.colores = response.data)
            .then(() => $scope.$digest())

        }
        Contarsucursales(){
            Version.contarSucursales(this.id)
            .then(response => this.cantidadsucursales = response.data )
            .then(() => $scope.$digest())
        }

        actualizar(){
            Version.actualizar(this.id)
            .then(response => {
                this.existencia = response.data.existencia
                this.precio = response.data.precio
            })
            .then(() => $scope.$digest())
        }

		editar(){
			Version.editar(this)
		}
        sincronizar(){
            Version.opciones(this.id)
            .then(response => this.opciones = response.data )
            .then(response => {
                if(self.atributos)
                    self.atributos.forEach(x => {
                        let opcion  = response.reduce((ac, n) =>
                            _.isNumber(ac) ? ac : x.id  ===  n.IdAtributo ? n.id : null, null)
                        !_.isNull(opcion) ? x.opcion = opcion : delete x.opcion
                    })
            })
            .then(() => $scope.$digest())
        }
        actualizaropciones(){
            Version.ligaropciones(new Object({
                id : this.id,
                opciones : self.atributos.map(n => n.opcion).filter(n => !_.isUndefined(n))
            }))
        }
        error(){

            $mdDialog.show({
                templateUrl: '/partialsadmin/asignarProducto',
                parent: angular.element(document.body),
                bindToController: false,
                locals : {
                    item : this,
                    producto : self.producto
                },
                preserveScope: false,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Producto, Marca, producto, Version) {

                    $scope.item = item
                    const self = this

                    Marca.obtener()
                    .then(response => this.marcas = new marcas_(response.data))
                    .then(() => $scope.$digest())

                    class marcas_ {
                        constructor(arg) {
                            this.items = arg
                        }
                        obtener(id){
                            return this.items.find(n => n.id === id)
                        }
                    }

                    class productos_ {
                        constructor() {
                            this.filtros = {}
                        }
                        seleccion(){}
                        buscar(){}
                        async filtrar(text){
                            return await Producto.busqueda({nombre : text })
                            .then(response => response.data.map(n => new producto_(n)))
                        }
                    }

                    class producto_ {
                        constructor(arg) {
                            Object.entries(arg).forEach(n => this[n[0]] = n[1])
                            this.marca = self.marcas.obtener(this.IdMarca)
                        }
                    }

                    self.productos = new productos_()

                    self.asignar = () => {

                        Producto.addVersion( self.productos.item.id , $scope.item.id)
                        .then(() => $mdDialog.hide())

                    }

                    self.crear = () => {

                        Producto.crear({
                            nombre : $scope.item.nombre,
                            IdMarca : producto.IdMarca,
                            IdGama : producto.IdGama,
                            IdLinea : producto.IdLinea,
                            IdCategoria : producto.IdCategoria,
                            status : 0
                        })
                        .then(response => Producto.addVersion( response.data.id , $scope.item.id))
                        .then(() => $mdDialog.hide())

                    }

                    self.eliminar = () => Version.eliminar(item.id)
                        .then(response =>  $mdDialog.hide())

                }
            })
            .then(response => self.producto.obtenerVersiones())
        }
        Obtenersucursales(){
            Version.sucursales(this.id)
            .then(response => this.sucursales = new sucursales_(response.data))
            .then(() => $scope.$digest())
        }

        verSucursales(){
            $mdDialog.show({
                templateUrl: '/partialsadmin/sucursalesXversion',
                parent: angular.element(document.body),
                bindToController: false,
                locals : { item : this },
                preserveScope: false,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Version) {

                    Version.sucursales(item.id)
                    .then(response => this.items = response.data)
                    .then(() => $scope.$digest())

                }
            })
        }
    }

    class sucursales_ {
        constructor(arg) {
            this.items = arg.map(n => new sucursal_(n))
        }
    }

    class sucursal_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.inventario = new inventario_(arg.inventarios)
        }
    }

    class inventario_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.existencias = {
                items : [],
                transformar : (text) => {
                    Existencia.crear({cantidad : text, inventario : this.id})
                    return text
                },
                remover : (item) => Existencia.eliminar(item.id)
            }
            // this.descuentos = {
            //     items : [],
            //     transformar : (text) => Descuento.crear({cantidad : text, inventario : this.id})
            //         .then(response => new Object({ cantidad : text })),
            //     remover : (item) => Descuento.eliminar(item.id)
            // }
            this.precios = {
                items : [],
                transformar : (text) => Precio.crear({cantidad : text, inventario : this.id})
                    .then(response => new Object({ cantidad : text })),
                remover : (item) => Precio.eliminar(item.id)
            }
            this.Obtenerprecios()
            this.Obtenerexistencias()
            // this.Obtenerdescuentos()
        }
        async Obtenerprecios(){
            this.precios.items = await Inventario.precios(this.id)
            .then(res => res.data)
            await $scope.$digest()
        }
        async Obtenerexistencias(){
            this.existencias.items = await Inventario.existencias(this.id)
            .then(res => res.data)
            await $scope.$digest()
        }

        // async Obtenerdescuentos(){
        //     this.descuentos.items = await Inventario.descuentos(this.id)
        //     .then(res => res.data)
        //     await $scope.$digest()
        // }
    }

    class modulos_ {
        constructor() {
            this.items = [
                new _modulo(Marca, 'marca'),
                new _modulo(Linea, 'linea'),
                new _modulo(Gama, 'gama')
            ]
        }
    }

    class observaciones_ {
        constructor(arg) {
            this.items = arg
            this.status = false
        }
        crear(){

            Observacion.crear(Object.assign(this.item, {IdProducto : id}))
            .then(response => this.items.push(response.data))
            .then(() => delete this.item)
            .then(() => $scope.$digest())

        }
        eliminar(id, idx){
            Observacion.eliminar(id)
            .then(response => this.items.splice(idx, 1))
            .then(() => $scope.$digest())
        }
    }

    self.categorias = {
        seleccion : (item) => {
            if(!_.isUndefined(item)){
                self.producto.IdCategoria = item.id
            }
        },
        filtrar : async (text) =>
                self.categorias.items.filter(n =>
                    n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)

    }

    self.modulos = new modulos_()

    Promise.all([
        Producto.portada(id).then(response => response.data),
        Producto.imagenes(id).then(response => response.data)
    ])
    .then(response => self.imagen = new imagenes_(response))
    .then(() => $scope.$digest())

    Producto.one(id)
    .then(response => self.producto = new producto_(response.data))
    .then(response => self.modulos.items.forEach(n => n.itemcito(response)))
    .then(() => $scope.$digest())

	Promise.all([
        Producto.one( Number(id) - 1 ),
        Producto.one( Number(id) + 1 )
    ])
    .then(response => [ self.anterior, self.siguiente ] = response.map(n => n.data))

    Producto.observaciones(id)
    .then(response => self.observaciones = new observaciones_(response.data))
    .then(response => $scope.$digest())

    Categoria.completo()
    .then(response => self.categorias.items = response.data)
    .then(() => self.producto.fijarCategoria())

    Color.obtener()
    .then(response => self.colores = response.data)
    .then(() => $scope.$digest())

});
