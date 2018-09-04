var app = angular.module('myapp');

app.controller('marcasCtrl', function($scope, $state, $mdDialog, Producto, Marca) {

    const self = this

    class marcas_ {
        constructor() {
            this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : ['id'],
                where : {},
                include : []
            }
        }

        obtener(){
            Marca.filtro(this.filtros)
            .then(response => {
                this.items = response.data.items.map(n => new marca_(n))
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
            await Marca.obtener()
            .then(response => this.items = response.data.map(n => new marca_(n)))
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
            .then(response => Marca.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('marca', { id : response.data.id}))
            .catch(() => { })

        }
    }

    class marca_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.procesos()
        }

        ir(){

            $state.go('marca', { id : this.id})
        }
        procesos(){
            Producto.procesosXmarca(this.id)
            .then(response => [  this.terminados, this.incompletos  ] = response.data )
			.then(() => $scope.$digest())
        }
    }

    self.marcas = new marcas_()


});
