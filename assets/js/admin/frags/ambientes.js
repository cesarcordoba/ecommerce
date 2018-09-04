var app = angular.module('myapp');

app.controller('ambientesCtrl', function($scope, $state, $mdDialog, Ambiente, Espacio) {

    const self = this

    class ambientes_ {
        constructor() {
            this.filtros = {
                pagina : 1,
                limite :  (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?  20 :  3,
                order : [ 'id' ],
                where : {},
                include : []
            }
        }
        obtener(){
            Ambiente.filtro(this.filtros)
            .then(response => {
                this.items = response.data.items.map(n => new ambiente_(n))
                this.filtros.paginas = response.data.paginas
            })
            .then(response => console.log(this))
            .then(() => $scope.$digest())
        }
        seleccion(){}
        buscar(){}
        async filtrar(){
            return this.items ?
            this.filter(n => n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
            :
            await Ambiente.obtener()
            .then(response => this.items = response.data.map(n => new ambiente_(n)))
        }
        crear(){

            $mdDialog.show(
                $mdDialog.prompt()
                    .title('¿Quieres crear un articulo?')
                    .textContent('Empieza por introducir su titulo')
                    .placeholder('Titulo')
                    .ok('Aceptar')
                    .cancel('Cancelar'))
            .then(response => Ambiente.crear({ nombre : response, status : 0 }))
            .then(response => $state.go('ambiente', { id : response.data.id}))
            .catch(() => { })

        }
    }

    class ambiente_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.productos()
            this.contar()
        }
		async contar(){
			this.espacio = await Espacio.contar(this.id)
            .then(response => response.data)
            await $scope.$digest()
		}

        async productos(){
            this.productos = await Ambiente.productos(this.id)
            .then(response => response.data)
            await $scope.$digest()
        }
        ir(){

            $state.go('ambiente', { id : this.id})
        }
    }

    self.ambientes = new ambientes_()



});
