var app = angular.module('myapp');

app.controller('sucursalesCtrl', function($scope, $state, $mdDialog, Sucursal) {

    const self = this

    class sucursales_ {
        constructor() {
            this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  10 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        }
        obtener(){
            Sucursal.filtro(this.filtros)
            .then(response => {
                this.items = response.data.items.map(n => new sucursal_(n))
                this.filtros.paginas = response.data.paginas
            })
            .then(() => $scope.$digest())
        }
        seleccion(){}
        buscar(){}
        async filtrar(){
            return this.items ?
            this.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
            :
            await Sucursal.obtener()
            .then(response =>
                this.items = response.data.map(n =>
                    new sucursal_(n)))
        }
        crear(){

            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un articulo?')
                    .textContent('Empieza por introducir su titulo')
                    .placeholder('Titulo')
                    .ok('Aceptar')
                    .cancel('Cancelar')
            )
            .then(response => Sucursal.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('sucursal', { id : response.data.id}))
            .catch(() => { })

        }
    }

    class sucursal_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        ir(){
            $state.go('sucursal', { id : this.id})
        }
    }

    self.sucursales = new sucursales_()



});
