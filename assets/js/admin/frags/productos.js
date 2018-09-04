angular.module('myapp')
.controller('productosCtrl', function($scope, $localStorage, $window, $mdDialog, $state, $mdDialog, $mdPanel, Producto, Marca, Linea, Gama, Categoria, Version, Posicion, anchorSmoothScroll) {

    const self = this

    $scope.status = {
        item : null,
        items : [0, 1, 2, 3, 4, 5],
        cambiar : () => {

            if(!_.isNull($scope.status.item)){

                self.productos.filtros.where.map(n => Object.entries(n)).forEach((n, key) => {

                    if((n[0][0] === 'status') && (n[1] !== $scope.status.item)){
                        self.productos.filtros.where.splice(key, 1)
                    }
                })

                self.productos.filtros.where.push( { status :  $scope.status.item } )
                console.log(self.productos.filtros.where)
            }
            console.log(self)

        }
    }

    class versiones_ {
        constructor() {
            this.status = true
        }
        seleccion(){}
        buscar(){}
		async filtrar(text){
            self.productos.filtros.version = text
            return await Version.busqueda({nombre : text })
            .then(response => response.data )
        }
    }

    self.versiones = new versiones_()

    class _modulos {
        constructor(arg, nombre) {
            this.nombre = nombre
            this.servicio = arg
            this.obtener()
        }
        async obtener(){
            this.items = await this.servicio[this.nombre === 'categoria' ? 'completo' : 'obtener']()
            .then(response => this.items = response.data)
        }

        seleccion(item){

            if(!_.isNull(this.item)){
                if(this.nombre === 'categoria')
                    self.productos.filtros.categoria = this.item
                else
                    self.productos.filtros.where.push({[ 'Id' + _.capitalize(this.nombre) ]  : this.item.id })

                self.productos.filtros.pagina = 1
                self.productos.obtener()

            }
        }
        buscar(x){

            if(this.item && !_.isNull(this.item) ) {

                let idx = self.productos.filtros.where.findIndex(n =>  Object.keys(n)[0] ===  ('Id' + _.capitalize(this.nombre)) )
                self.productos.filtros.where.splice(idx, 1)
                self.productos.filtros.pagina = 1
                self.productos.obtener()

            }
        }
        async filtrar() {
            return this.items.filter(n => !_.isNull(n.nombre) && n.nombre.toLowerCase().indexOf(this.busqueda.toLowerCase()) > -1 )
        }
        sincronizar(id){

        }
    }

    self.modulos = [
        new _modulos(Categoria, 'categoria'),
        new _modulos(Marca, 'marca'),
        // new _modulos(Linea, 'linea'),
        new _modulos(Gama, 'gama')
    ]

    class productos_ {
        constructor(arg) {
            this.filtros = !_.isUndefined(arg) ? arg : this.filtro()
            this.procesos()
            this.sincronizar()
        }
        sincronizar(){
            this.filtros.where.forEach(n => {
                switch (Object.keys(n)[0]) {
                    case 'IdMarca':
                        self.modulos[1].sincronizar(n.IdMarca)
                        break;
                    case 'IdGama':
                        break;
                    case 'status':

                        $scope.status.item = n.status
                        break;
                    default:
                }
            })
        }
        procesos(){

            Producto.procesos()
            .then(response => [ this.todos, this.completos , this.sinrevision, this.sinimagen, this.sinversiones, this.sinatributos, this.incompletos, this.descontiniuados ] = response.data )

        }
        filtro(){
            return this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['nombre'],
                where : [],
                include : []
            }
            self.modulos.forEach(n => n.item = null)
        }
        obtener(){
            console.log(this.filtros)
            delete this.items
            Producto.filtro(this.filtros)
            .then(response => {
                $localStorage.peticion = this.filtros
                this.items = response.data.items ? response.data.items.map(n => new producto_(n)) : null
                this.filtros.paginas = response.data.paginas
            })
            .then(() => $scope.$digest())
        }
        seleccion(){
            if(this.item)
                this.filtro.nombre = this.item.nombre,
                self.productos.filtros.pagina = 1,
                this.obtener()
            else
                delete this.filtro.nombre
        }
        buscar(){

        }
        async filtrar(text){

            this.filtros.nombre = text

            return await Producto.busqueda({nombre : text })
            .then(response => response.data )
        }
        crear(){

            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un producto?')
                    .textContent('Empieza por introducir su titulo')
                    .placeholder('Titulo')
                    .ok('Aceptar')
                    .cancel('Cancelar')
            )
            .then(response => Producto.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('producto', { id : response.data.id}))
            .catch(() => { })
        }
        limpiar(){
            delete this.item
            delete $scope.status.item
            self.modulos.forEach(n => delete n.item )
            this.filtro()
            this.obtener()
        }
    }

    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])

            this.contarVersiones()
            this.contarAmbientes()
            this.marca = self.modulos[1].items.find(n => n.id === this.IdMarca)
            this.categoria = self.modulos[0].items.find(n => n.id === this.IdCategoria)
            // this.linea = self.modulos[2].items.find(n => n.id === this.IdLinea)
            this.gama = self.modulos[2].items.find(n => n.id === this.IdGama)

            if(self.versiones.status)
                this.versiones()
        }

        versiones(){
            Producto.versiones(this.id)
            .then(response => this.versiones = response.data.map(n => new version_(n)))
        }


		ir(){
			$window.open('admin#/producto/' +  this.id + '/' +  null)
        }

        async contarVersiones(){
            this.cantidadversiones = await Version.contar(this.id)
            .then(response => response.data)
            await $scope.$digest()
        }
        async contarAmbientes(){
            this.cantidadambientes = await Posicion.contar(this.id)
            .then(response => response.data)
            await $scope.$digest()
        }
        portada(){
            $mdDialog.show({
                template: `
                    <div style="width: 100%; display: flex; justify-content: center">
                        <img src="{{ctrl.portada.imagen}}" ng-if="ctrl.portada" style="max-height: 200px; max-width : 200px;">
                    </div>
                `,
                parent: angular.element(document.body),
                bindToController: false,
                locals : { item : this },
                preserveScope: false,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Producto) {

                    Producto.portada(item.id)
                    .then(response => this.portada = response.data)
                    .then(() => $scope.$digest())

                }
            })
        }
        editar(){
            $mdDialog.show({
                templateUrl: '/partialsadmin/producto',
                parent: angular.element(document.body),
                bindToController: false,
                locals : { item : this, modulos : self.modulos },
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Producto, modulos) {

                    const self = this

                    self.modulos = modulos.map(m => {

                        let id = Object.entries(item).find(n => n[0] === transformar(m.nombre))

                        return new Object({
                            servicio : m.servicio,
                            nombre : m.nombre,
                            items : m.items,
                            filtrar : m.filtrar,
                            item : !_.isUndefined(id) ? m.items.find(n => n.id === id[1]) : null,
                            buscar : () => {},
                            selecionar : (idx) => {

                                if(self.modulos[idx].item)
                                    self.producto[ transformar(self.modulos[idx].nombre) ] = self.modulos[idx].item.id
                            }
                        })
                    })

                    self.producto = item
                    self.producto.editar = () => Producto.editar(self.producto)
                    .then(() => $mdDialog.hide())

                }
            })
        }
    }

	class version_ {
		constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.opciones()
            this.colores()
		}
        colores(){
            Version.colores(this.id)
            .then(response => this.colores = response.data)
            .then(response => $scope.$digest())
        }
        opciones(){
            Version.opciones(this.id)
            .then(response => this.opciones = response.data )
            .then(response => $scope.$digest())
        }
        abrir(ev, producto){

            var version = this

            $mdPanel.open({
            attachTo: angular.element(document.body),
            clickOutsideToClose: true,
            position: $mdPanel.newPanelPosition()
                .absolute()
                .top(ev.y + 'px')
                .left(ev.x + 'px'),
            controllerAs: 'ctrl',
            controller: function($window, $state ) {

                this.ir = () => $state.go('producto', {id: producto, version : version.id })
                this.editar = () => version.editar()

            },
            template: `
                <md-card>
                    <md-list>
                        <md-list-item ng-click="ctrl.ir()">
                            <md-icon> edit </md-icon>
                        </md-list-item>
                        <md-list-item ng-click="ctrl.editar()">
                            <md-icon> info </md-icon>
                        </md-list-item>
                    </md-list>
                </md-card>
            `})

        }
        editar(){
            $mdDialog.show({
                templateUrl: '/partialsadmin/version',
                parent: angular.element(document.body),
                bindToController: false,
                locals : { item : this },
                fullscreen: true,
                // clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Version, Sucursal, Inventario, Precio) {

                    const self = this

                    self.inventarios = {
                        seleccion : null,
                        items : [],
                        obtenerPrecios : async () => {
                            self.inventarios.precios.items = await Inventario.precios(self.inventarios.seleccion)
                            .then(response => response.data)
                            await $scope.$digest()
                        },
                        precios : {
                            items : [],
                            transformar : (text) => Precio.crear({cantidad : text, inventario : self.inventarios.seleccion}),
                            remover : (item) => Precio.eliminar(item.id)
                        }
                    }

                    Version.inventarios(item.id)
                    .then(response => self.inventarios.items = response.data.map( n => new inventario_(n)) )

                    class inventario_ {
                        constructor(arg) {
                            Object.entries(arg).forEach(n => this[n[0]] = n[1])
                            this.Obtenersucursal()
                        }
                        async Obtenersucursal(){
                            this.sucursal = await Sucursal.one(this.IdSucursal)
                            .then(res => res.data)
                        }
                    }

                    self.cerrar = () => $mdDialog.hide()
                }
            })
            .then(() => Version.actualizar(this.id)
            .then(response => {
                this.existencia = response.data.existencia
                this.precio = response.data.precio
            })
            .then(() => $scope.$digest()))
        }
	}

    self.productos = $localStorage.peticion ? new productos_( $localStorage.peticion ) :  new productos_()

    function transformar(text){
        return 'Id' +  _.capitalize(text)
    }

    self.info = (ev) => {



        $mdPanel.open({
        attachTo: angular.element(document.body),
        clickOutsideToClose: true,
        position: $mdPanel.newPanelPosition()
            .absolute()
            .top(ev.pageY  + 'px')
            .left(ev.pageX + 'px'),
        controllerAs: 'ctrl',
        controller: function(mdPanelRef) {},
        template: `
            <md-card><md-card-content>
                <p> 1 (completo) </p>
                <p> 2 (falta revisión) </p>
                <p> 3 (falta imagen) </p>
                <p> 4 (falta versiones) </p>
                <p> 5 (falta atributos) </p>
                <p> 5 (Descontinuados) </p>
            </md-card-content></md-card>
        `})
    }


});
