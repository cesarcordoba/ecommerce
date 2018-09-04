var app = angular.module('myapp');

app.controller('lineasCtrl', function($scope, $state, $mdDialog, Linea) {

    const self = this

    class lineas_ {
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
            Linea.filtro(this.filtros)
            .then(response => {
                this.items = response.data.items.map(n => new linea_(n))
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
            await Linea.obtener()
            .then(response => this.items = response.data.map(n => new linea_(n)))
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
            .then(response => Linea.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('linea', { id : response.data.id}))
            .catch(() => { })

        }
    }

    class linea_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        ir(){

            $state.go('linea', { id : this.id})
        }
    }

    self.lineas = new lineas_()

});
