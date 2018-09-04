var app = angular.module('myapp');

app.controller('categoriasCtrl', function($scope, $state, $mdDialog, Categoria) {

    const self = this

    class nivel_ {
        constructor(arg, categoria) {
            this.padre = categoria
            this.nivel = categoria.nivel
            this.items = arg.map(n => new categoria_(n))
            this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  3 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        }
        cerrar(idx){
            self.niveles.items.splice(idx, 1)
        }
        seleccion(){}
        buscar(){}
        async filtrar(text){
            return this.items ?
            this.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
            :
            await Categoria.obtener()
            .then(response => this.items = response.data.map(n => new categoria_(n)))
        }
        crear(){crear(this.padre)}
        obtener(){
            Categoria.subcategorias(this.padre.id)
            .then(response => this.items = response.data.map(n => new categoria_(n)))
        }
    }

    class niveles_ {
        constructor() {
            this.obtener()
        }
        introducir(items , categoria){

            this.items.forEach((n, key) => {


                if(n.nivel >= categoria.nivel)
                    this.items.splice(key, 1)

            })

            $scope.$digest()

            this.items.push(new nivel_(items, categoria))

            $scope.$digest()

        }
        obtener(){

            console.log('si')

            this.items = []

            Categoria.nivel(1)
            .then(response => this.items.push(  new nivel_( response.data, {nivel : 0} )))
            .then(() => $scope.$digest())

        }
    }

    self.niveles = new niveles_()



    class categorias_ {
        constructor() {
            this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  3 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        }

        obtener(){
            Categoria.obtener()
            .then(response => {
                this.items = response.data.map(n => new categoria_(n))
                // this.filtros.paginas = response.data.paginas
            })
            .then(response => console.log(this))
            .then(() => $scope.$digest())
        }

    }

    class categoria_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        ir(){
            $state.go('categoria', { id : this.id})
        }
        cambiarNivel(){
            $mdDialog.show({
                templateUrl: '/partialsadmin/cambiarNivel',
                parent: angular.element(document.body),
                bindToController: false,
                locals : { item : this },
                preserveScope: false,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'ctrl',
                controller: function ($scope, $mdDialog, item, Categoria) {

                    const self = this

                    $scope.item = item

                    self.categorias = {
                        seleccion : (item) => {},
                        buscar : (text) => {},
                        filtrar : async (text) => self.categorias.items ?
                                self.categorias.items.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
                                :
                                await Categoria.obtener().then(res => self.categorias.items = res.data)
                    }

                    self.aceptar = () => Categoria.cambiarNivel(self.categorias.item.id, item.id)
                        .then(response => console.log(response))
                        // .then(() => $mdDialog.hide())

                }
            })
            .then(() => self.niveles.obtener())
        }
        subcategoria(){
            self.niveles.items.forEach((n, key) => {

                if(n.nivel > this.nivel)
                    self.niveles.items.splice(key, 1)

            })

            Categoria.subcategorias(this.id)
            .then(response => {

                response.data.length > 0 ?
                    self.niveles.introducir(response.data, this)
                    :
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Ya no hay más subniveles')
                        .textContent('No existen subniveles para este nivel, si quieres crear uno ')
                        .ok('Ok')
                    )

            })
            .then(() => $scope.$digest())
        }

        crear(){
            crear(this)
        }
    }

    self.categorias = new categorias_()

    function crear(categoria){
        $mdDialog.show(
            $mdDialog.prompt()
                .title('¿Quieres crear un articulo?')
                .textContent('Empieza por introducir su titulo')
                .placeholder('Titulo')
                .ok('Aceptar')
                .cancel('Cancelar')
        )
        .then(response => Categoria.crear({ nombre : response, IdCategoria : categoria.id , status : 0, nivel : categoria.nivel + 1 }))
        .catch(() => { })
    }

    console.log(self)


});
