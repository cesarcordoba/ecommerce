app.controller('mainCtrl', function ($scope, $state,  $mdPanel, $rootScope, $http, mdDialog, Auth, Producto, Categoria) {

    const self = this

    $rootScope.logueado = false;
    
    var buscar = (array, id) => array.filter(n => n.IdCategoria === id).map(n => {
            let objectos =  buscar(array, n.id)
            return [ Object.assign(n, {cantidad : objectos.length})  , objectos ]
        })


    Categoria.obtener()
    .then(response => self.categorias = _.flattenDeep([
        { id : 1, nivel : 1, nombre : 'Pisos y azulejos' }, buscar(response.data, 1),
        { id : 2, nivel : 1, nombre : 'Mobiliario de Baño'}, buscar(response.data, 2),
        { id : 70, nivel : 1, nombre : 'Material de Construcción'}, buscar(response.data, 70)
    ]).map(n => new item_(n)))
    .then(() => $scope.$digest())

    class item_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.status = false
            this.open = false
            if(arg.nivel === 1 || arg.nivel === 2){
                this.status = true
            }
        }
        enter(x){

            if(!_.isUndefined(x))
                this.open = !this.open

            self.categorias.forEach(n => {
                if(this.id === n.IdCategoria)
                    if(this.open === true && n.status === false){
                        n.status = true
                    } else {
                        n.open = false
                        n.status = false
                        n.enter()
                    }
            })

        }

    }

    class productos_ {
        constructor() {
        }
        seleccion(){
            $state.go('producto', {id : this.item.id})
        }
        buscar(){}
        async filtrar(){
            return await Producto.filtro({
                limite : 10,
                pagina : 1,
                nombre : this.busqueda,
                where : [{status : 1}],
                include : []
            }).then(response => response.data.items ? response.data.items : [])
        }
    }

    self.productos = new productos_()

    self.abrir = () => {

        $mdPanel.open({
        attachTo: angular.element(document.body),
        clickOutsideToClose: true,
        position: $mdPanel.newPanelPosition()
            .absolute()
            .top('90px')
            .left('0px'),
        controllerAs: 'ctrl',
        controller: function(mdPanelRef) {
            this.categorias = self.categorias
        },
        templateUrl: '/partialsmain/categorias' })
    }

    $scope.mandarLogin = () =>{
        $state.go('login')
    }

    $scope.mandarCarrito = () =>{
        $state.go('carrito')
    }

    $scope.mandarPerfil = () =>{
        $state.go('perfil.infobasica')
    }

     $scope.logout = () =>{

        Auth.logout()
        $rootScope.logueado = false;

    }

    

});
