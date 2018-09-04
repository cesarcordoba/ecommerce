var app = angular.module('myapp');

app.controller('gamasCtrl', function($scope, $state, $mdDialog, Gama) {

    const self = this

    class gamas_ {
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
            Gama.filtro(this.filtros)
            .then(response => {
                this.items = response.data.items.map(n => new gama_(n))
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
            await Gama.obtener()
            .then(response => this.items = response.data.map(n => new gama_(n)))
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
            .then(response => Gama.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('gama', { id : response.data.id}))
            .catch(() => { })

        }
    }

    class gama_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        ir(){
            $state.go('gama', { id : this.id})
        }
    }

    self.gamas = new gamas_()



});
