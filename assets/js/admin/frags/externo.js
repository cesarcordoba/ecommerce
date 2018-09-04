var app = angular.module('myapp');

app.controller('externoCtrl', function($scope, $stateParams, Firebird, Base, Tabla) {

    $scope.sortBy = function(propertyName) {
       $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
       $scope.propertyName = propertyName;
    };

    $scope.propertyName = 'cantidad';
    $scope.reverse = true;

    const self = this

    self.paginacion = {
        pagina : 1,
        paginas : 0,
        limite : 15
    }

    self.obtener = () => {

        $scope.obteniendo = true

        if(self.tabla && self.base){

            Firebird.obtener({ tabla : self.tabla.nombre, url : _.isUndefined(self.base) ? 'cor1/SAE70EMPRE02.FDB' : self.base.url, paginacion: self.paginacion, searching : $scope.searching })
            .then(response => {

                if(response.data.items){

                    self.atributos = Object.keys(response.data.items[0])
                    self.rows = response.data.items
                    self.paginacion.paginas = response.data.paginas
                    $scope.obteniendo = false


                }else{

                    delete self.atributos
                    delete self.rows
                    $scope.obteniendo = false


                }

            })
            .then(() => $scope.$digest())
        }
    }

    self.mandar = (tabla) => {
        self.tabla = tabla
        self.paginacion.pagina = 1
        delete $scope.searching
        self.obtener()
    }

    self.buscar = (row , atributo) => {

        $scope.searching = {
            [atributo] : row[atributo],
            atributo : atributo
        }
        self.obtener()
    }

    self.generartablas = () => Base.tablaXbase(self.base.id)
        .then(response =>  self.tablas = response.data.map(n => new tabla_(n)))
        .then(() => $scope.$digest())


    Firebird.tablas({url : self.base})
        .then(response => self.tablas = response.data.map(n =>
                n.RDB$RELATION_NAME.charAt(3) !== '$' ? n.RDB$RELATION_NAME : null
            ).filter(n => !_.isNull(n)))
        .then(() => $scope.$digest())

    Base.obtener()
    .then(response => self.basededatos = response.data)
    .then(() => $scope.$digest())

    // let index = 0
    // //
    // const Cantidad = {
    //     [Symbol.iterator] : () => {
    //         return {
    //             next : () => {
    //                 index++
    //                 const consumer = index > 2 ? false : true
    //                 if(!consumer){
    //                     return { done : true }
    //                 }
    //                 return {
    //                     value : consumer,
    //                     done : false
    //                 }
    //             }
    //         }
    //     }
    // }
    //
    //
    //
    // //
    // let algo = Cantidad[Symbol.iterator]()
    // console.log(algo.next())
    // console.log(algo.next())
    // console.log(algo.next())
    // console.log(algo.next())
    // console.log(algo.next())


    // function* Cantidad () {
    //     yield 'Hola'
    //     yield 'como estas'
    //     yield 'Teva'
    // }
    //
    // console.log(Cantidad())

    class tabla_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.cantidad()
        }
        cantidad(){

            Tabla.cantidad(this.id)
            .then(response => this.cantidad = response.data)
            .then(() => $scope.$digest())
        }
    }

    console.log(self)

    $scope.print = () => {
        console.log(self)
        console.log($scope.searching)
    }

})
