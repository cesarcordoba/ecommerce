app.component('azules',{
    bindings: {

    },
    controllerAs: 'ctrl',
    template: `
        <canvas id="azules"> </canvas>
    `,
    controller: ($scope) => {

        var canvas = document.getElementById("azules");
        var ctx = canvas.getContext("2d");

        console.log($('azules'))

        let inicio = 0
        let height = 200
        let width = 50

        var colores = ['#003143', '#01303d', '#00252d', '#011a1e'].forEach((n, key) => {

            key++

            ctx.beginPath();
            ctx.moveTo((width * key), (inicio));
            ctx.lineTo(((width * key) + width), (inicio * key));
            ctx.lineTo((width * key), height);
            ctx.lineTo(((width * key) - width), height);
            ctx.fillStyle = n
            ctx.strokeStyle = n
            ctx.fill()
            ctx.stroke()
            ctx.closePath();

        })

    }
});

app.component('portada', {
    bindings: {
        id: '=',
        conector: '&'
    },
    controllerAs: 'ctrl',
    template: `
        <div id="{{ctrl.id}}" class="portada">
            <div class="spinner" ng-if="!ctrl.portada">
                <md-progress-circular ng-disabled="ctrl.portada === null" md-mode="indeterminate" md-diameter="30" ></md-progress-circular>
            </div>
            <img class="imgportada" ng-src="{{ctrl.portada}}" ng-if="ctrl.portada !== null">
        </div>`,
    controller: function($scope, Portada) {

        const self = this

        Portada.producto(this.id)
        .then(response => {

			// console.log(response)

			this.portada = !_.isNull(response.data) ? response.data.link : null


		})
        .then(() => $scope.$digest())
        .then(() => self.conector({ id : 1 }))

    }
})

app.component('imagen',{
    bindings: {
        id: '=',
        conector: '&'
    },
    controllerAs: 'ctrl',
    template: `
        <div class="imagen">
            <div class="spinner" ng-if="!ctrl.imagen">
                <md-progress-circular md-mode="indeterminate" md-diameter="50" ></md-progress-circular>
            </div>
            <img class="imgimagen" ng-src="{{ctrl.imagen}}" ng-if="ctrl.imagen">
        </div>`,
    controller: function($scope, Imagen) {

        const self = this

        Imagen.one(this.id)
        .then(response => this.imagen = response.data ? response.data.link : null)
		.then(response => console.log(response))
        .then(() => $scope.$digest())
        .then(() => self.conector({ id : 1 }))

    }
})

app.component('producto',{
    bindings: {
        producto: '=',
        conector: '&',
        focus : '='
    },
    controllerAs: 'ctrl',
    templateUrl: 'main/componentes/producto',
    controller: function($scope, $rootScope,  Producto, Version) {

		const self = this

        var proceso = (x) => {
            this.obj = {
                portada : false,
                versiones : false
            }
            this.obj[x] = true
        }

        console.log(this.producto)

        class version_ {
            constructor(arg, promo) {
                console.log(arg)
                Object.entries(arg).forEach(n => this[n[0]] = n[1])
                this.opciones()
                this.colores()
                this.ObtenerPrecio()
                this.ObtenerEntrantes()
                this.oferta = false
                if(!_.isUndefined(promo) && promo[0] && promo[0].disponibles.descuento > 0)
                    this.ObtenerDescuento()

            }
            colores(){
                Version.colores(this.id)
                .then(response => this.colores = response.data)
                .then(response => $scope.$digest())
            }
            opciones(){
                Version.opcionesdisponibles(this.id)
                .then(response => this.opciones = response.data )
                .then(response => $scope.$digest())
            }
            ObtenerPrecio(){
                // this.precio = version.precio
                // Version.precio(this.id)
                // .then(response => this.precio = response.data)
                // .then(() => $scope.$digest())
            }

            ObtenerEntrantes(){
                Version.entrantes(this.id)
                .then(response => this.entrantes = response.data)
                .then(() => $scope.$digest())
            }

            ObtenerDescuento(){
                Version.descuento(this.id)
                .then(response => {
                    if(response.data > 0)
                        this.descuento = response.data
                        this.oferta = true
                })
                .then(() => $scope.$digest())
            }
        }

        class producto_ {

            constructor(arg) {
                Object.entries(arg).forEach(n => this[n[0]] = n[1])
                this.ObtenerVersiones(arg.Versiones)
            }

            ObtenerVersiones(x){

                console.log(x)

                    Producto.promos(this.id)
                    .then(response => this.promociones = response.data)
                    .then(promo => _.isUndefined(x) ?
                        Producto.versionesdisponibles(this.id)
                            .then(response => this.versiones = response.data.map(n => new version_(n, promo)))
                            :
                            this.versiones = x.map(n => new version_(n, promo)))
                    .then(response =>{

                        console.log(response)
                        self.conector({ id : response.length })})
                    .then(() => proceso('versiones'))
                    .then(() => $scope.$digest())

            }
        }

        self.producto = new producto_(self.producto)

    }
})

app.directive('clPaging', function() {
    return {
        restrict: "EA",
        scope: {
            clPages: "=",
            clAlign: "@",
            clAlignModel: "=",
            clPageChanged: "&",
            clSteps: "=",

            clCurrentPage: "="
        },
        controllerAs: "vm",
        templateUrl: '/partials/paginacion',
        controller: function($scope){
            var vm = this;
            vm.first = "navigate_before",
            vm.last = "navigate_next",
            vm.index = 0,
            vm.clSteps = $scope.clSteps,


            vm.limite = $scope.limite,
            vm["goto"] = function(index) {
                $scope.clCurrentPage = vm.page[index]
            },
            vm.gotoPrev = function() {
                $scope.clCurrentPage = vm.index,
                vm.index -= vm.clSteps
            },
            vm.gotoNext = function() {
                vm.index += vm.clSteps,
                $scope.clCurrentPage = vm.index + 1
            },
            vm.gotoFirst = function() {
                vm.index = 0,
                $scope.clCurrentPage = 1
            },
            vm.gotoLast = function() {
                vm.index = parseInt($scope.clPages / vm.clSteps) * vm.clSteps,
                vm.index === $scope.clPages
                    ? vm.index = vm.index - vm.clSteps
                    : "",
                $scope.clCurrentPage = $scope.clPages
            },
            $scope.$watch("clCurrentPage", function(value) {
                vm.index = parseInt((value - 1) / vm.clSteps) * vm.clSteps,
                $scope.clPageChanged()
            }),
            $scope.$watch("clPages", function() {
                vm.init()
            }),

            vm.init = function() {
                vm.stepInfo = function() {
                    for (var result = [], i = 0; i < vm.clSteps; i++)
                        result.push(i);
                    return result
                }(),
                vm.page = function() {
                    for (var result = [], i = 1; i <= $scope.clPages; i++)
                        result.push(i);
                    return result
                }()
            }
        }
    }
})
