var app = angular.module('myapp');

app.controller('categoriaCtrl', function($scope, $mdDialog, $stateParams, Categoria, Atributo, Opcion) {

    const
        self = this,
        id  = $stateParams.id

    class categoria_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.atributos()
        }
        atributos(){
            Categoria.atributos(id)
            .then(response => this.atributos = response.data.map(n => new atributo_(n)))
            .then(response => console.log(response))
            .then(() => $scope.$digest())
        }
        editar(){
            Categoria.editar(this)
        }
    }

    class atributos_ {
        constructor() {
        }

        seleccion(){}
        buscar(){}
        async filtrar(text){
            return text.length > 1 ?
            this.items.filter(n =>
                n.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1)
            :
            await Atributo.obtener()
            .then(response => this.items = response.data.map(n => new atributo_(n)))
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
            .then(response => Atributo.crear({ nombre : response}))
            .then(response => {
                Categoria.ligaratributo(id, response.data.id)
                this.items.push(new atributo_( response.data ))
            })
            .then(() => $scope.$digest())
            .catch(() => { })
        }
        ligar(){
            Categoria.ligaratributo(id, this.item.id)
        }
    }

    class atributo_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        opciones(){

            self.atributos.item = this

            delete self.opciones.item

            Atributo.opciones(this.id)
            .then(response => self.opciones.items = response.data.map(n => new opcion_(n) ))
            .then(response => console.log(response))
            .then(() => $scope.$digest())

        }
        editar(){
            Atributo.editar(this)
        }
    }

    class opciones_ {
        constructor() {
            this.items = []
        }
        crear(){

            console.log(this)
            console.log(this.item)

            Opcion[  _.isUndefined(this.item.id) ? 'crear' : 'editar' ](this.item)
                .then(response => {

                    if(_.isUndefined(this.item.id)){
                        Atributo.ligaropcion(self.atributos.item.id, response.data.id)
                        this.items.push(new opcion_( response.data ))
                    }

                    delete this.item

                })
                .then(() => $scope.$digest())

        }
        ligar(){
            Atributo.ligaropcion(self.atributos.item.id, this.item.id)
        }
    }

    class opcion_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
        }
        editar(){
            self.opciones.item = this
        }
        eliminar(idx){
            Opcione.eliminar(this.id)
            .then(() => self.opciones.items.splice(idx, 1))
            self.opciones.item = this
        }
    }

    Categoria.one(id)
    .then(response => self.categoria = new categoria_(response.data))
    .then(() => $scope.$digest())

    console.log($stateParams)

    self.atributos = new atributos_()
    self.opciones = new opciones_()

    console.log(self)


});
