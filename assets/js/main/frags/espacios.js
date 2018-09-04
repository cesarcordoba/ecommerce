angular.module('myapp')
.controller('espaciosCtrl', function($scope, $localStorage, Ambiente, Espacio, Cuarto, Categoria) {

    const
        self = this

    $scope.obtenercategorias = () => {
        Categoria.obtener()
        .then(response => console.log(response))
    }

    Cuarto.obtener()
    .then(response => self.cuartos = response.data.map(n => new cuarto_(n)))
    .then(() => $scope.$digest())

    class cuarto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
    }

    class ambientes_ {
        constructor(arg) {
            this.items = []
            this.filtros = !_.isNull(arg) ? arg : this.filtro()
        }
        filtro(){
            return {
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
    }

    class ambiente_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerEspacio()
        }
        obtenerEspacio(){
            Espacio.one(this.id)
            .then(response => this.imagen = response.data )
            .then(() => $scope.$digest())
        }
    }

    self.ambientes = new ambientes_( $localStorage.mainpaticionambientes ? $localStorage.mainpaticionambientes : null )

});
