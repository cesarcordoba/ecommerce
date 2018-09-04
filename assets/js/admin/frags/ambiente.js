var app = angular.module('myapp');

app.controller('ambienteCtrl', function($scope, $stateParams, $mdDialog, $state,  $mdPanel, alertas, Ambiente, Producto, Posicion, Cuarto, Espacio) {

    paper.install(window)
    paper.setup('canvas')

    var canvas = document.getElementById("background")
    var ctx = canvas.getContext("2d")

    const height = $('#canvas').height()
    const width = $('#canvas').width()

	const
        self = this,
        id = $stateParams.id

    var image = new Image()
    image.onload = () =>  ctx.drawImage( image, 0, 0, 1000, 600 )

    var tool = new paper.Tool()

    tool.onMouseDrag = (event) => {
        if(self.objetivo){
            let idx = self.ambiente.productos.findIndex(n =>  n.id === self.objetivo.id )
            self.ambiente.productos[idx].cambiar(event)
        }
    }

    tool.onMouseDown = (event) => {

        console.log(event)

        self.ambiente.productos.forEach(n =>
            n.clicked(event.point.x, event.point.y))}


    $('.dropify').dropify({ messages: { default: 'Agregar', replace: 'Reemplazar', remove: 'Eliminar', error: 'Error' }})
    .on('change', function(){
        if (this.files && this.files[0]) {
            let reader = new FileReader()
            reader.onload = e =>
                $scope.$apply(() =>
                    self.ambiente.espacio.input = e.target.result )
            reader.readAsDataURL( this.files[0] )
        }
    })

    class imagen_ {
        constructor() {
            this.editar = false
        }
    }

    class espacio_ {
        constructor(arg){
            this.item = arg
            this.editar = false
            this.status = false
            this.viewport = { w : 700 , h : 450 }
            this.boundry = { w : 850 , h : 550 }
            this.canvas()
            this.resize()
        }
        print(){


        }
        resize(height = $('.imagen').height(), width = $('.imagen').width()){

            this.p = width / 1000
            this.width = width
            this.height = 600 * this.p

            $("#canvas").css({ width : this.width + 'px', height : this.height + 'px' })
            $("#background").css({ width : this.width + 'px', height : this.height + 'px' })
            $scope.$digest()

        }
        canvas(){

            if(!_.isNull(this.item)){
                // this.size = this.item.imagen ? this.item.imagen.length / 1024 : 0
                image.src = this.item.link
                $scope.$digest()
            }

        }
        crear(){

            console.log(this.output.length / 1024)

            this.status = true
            let item = {IdAmbiente : id, imagen : this.output}
            Espacio.crear(item)
            .then(response => {
                this.item = response.data
                image.src = this.output
                this.status = false
            })
            .then(() => $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('La imagen ha sido creada')
                .textContent('Se ha actualizado o creado la imagen')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok!')))
            .then(() => $scope.$digest())
        }
    }

    class ambiente_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.width = 1000
            this.height = 600
            this.p = 1
            this.productos()
			this.obtenerEspacio()

        }
        obtenerEspacio(){
            Ambiente.espacio(id)
            .then(response => this.espacio = new espacio_(response.data))
            .then(() => $scope.$digest())
        }

        productos(){
            Ambiente.productos(id)
            .then(response => this.productos = response.data.map(n => new producto_(n)))
            .then(() => $scope.$digest())
        }
        actualizar(){
            Ambiente.editar(this)
            .then(() => $scope.$digest())
            .then(() => alertas.mostrarToastEstandar("Se ha actualizado el ambiente"))
        }

        eliminar(){
            $mdDialog.show(
                $mdDialog.confirm()
                    .title('¿Seguro que quieres eliminar la area?')
                    .textContent('Para eliminar de forma permanente dale en aceptar')
                    .ok('Aceptar')
                    .cancel('Cerrar')
                    .clickOutsideToClose(true))
            .then(() => Ambiente.eliminar(this.id))
            .then(() => $state.go('ambientes'))
        }
    }

    class productos_ {
        constructor() {
        }
        seleccion(){}
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
        ligar(){
            Ambiente.ligarproducto(id, this.item.id)
            .then(() => self.ambiente.productos.push(new producto_(Object.assign(this.item, {  posiciones : {  x : 0, y : 0 } } ))))
            .then(() => delete this.item)
            .then(() => $scope.$digest())
        }
    }

    class producto_{
        constructor(arg){
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.dibujar()
            this.r = 10
            this.status = false
            this.dragging = false
            this.procesando = false
        }
        clicked(x, y){

            if(dist({ left : x , top: y}, { left : this.posiciones.x * self.ambiente.p, top: this.posiciones.y * self.ambiente.p}, this.r) < this.r){


                let {top , left} = $('#background ').position()

                var item = this

                $mdPanel.open({
                attachTo: angular.element(document.body),
                clickOutsideToClose: true,
                position: $mdPanel.newPanelPosition()
                    .absolute()
                    .top(top +  this.posiciones.y  + 'px')
                    .left(left +  this.posiciones.x  + 'px'),
                // targetEvent: ev,
                controllerAs: 'ctrl',
                controller: function(mdPanelRef) {

                    this.item = item

                    console.log(item)

                },
                template: `
                    <md-card>
                        <p> {{ctrl.item.nombre}} </p>
                    </md-card>
                `})

            }

        }
        dibujar(){


            let punto = new paper.Point(this.posiciones.x, this.posiciones.y)

            this.circulo = new paper.Path.Circle( punto, new paper.Size(10, 10))
            this.circulo.fillColor = 'white';

            this.texto = new PointText(punto);
            this.texto.justification = 'center';
            this.texto.fillColor = 'black';

            this.texto.content = this.nombre;
            this.texto.fontWeight = 40;

        }

        editar(){

            self.ambiente.productos.forEach(n => this.id === n.id ? n.status = true : n.status = false )
            self.objetivo = this

        }
        cambiar(event){

            console.log('si')

            this.posiciones.x = event.point.x
            this.posiciones.y = event.point.y
            this.circulo.position = event.point

        }

        actualizar(){

			this.procesando = true;

            Posicion.editar(this.posiciones)
            .then(response => {

                this.status = false
                this.procesando = false
                delete self.objetivo

            })
            .then(() => $scope.$digest())

        }
        eliminar(idx){ Ambiente.desligarproducto(id, this.id)
            .then(() => self.ambiente.productos.splice(idx, 1))
            .then(() => $scope.$digest()) }
        ir(){ $state.go('producto', {id: this.id}) }

    }

    self.productos = new productos_()

    Ambiente.one(id)
    .then(response => self.ambiente = new ambiente_(response.data))
    .then(() => $scope.$digest())

    Cuarto.obtener()
    .then(response => self.cuartos = response.data)
    .then(() => $scope.$digest())


    function dist(c1, c2, r){

        var div1x = c1.left + r/2;
        var div1y = c1.top + r/2;


        var div2x = c2.left + r/2;
        var div2y = c2.top + r/2;


        var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
        return distance = Math.sqrt(distanceSquared);

    }

	Promise.all([ Number(id) - 1,  Number(id) + 1 ].map(async (n) => {
        console.log(n)
		return new Object({
            id : n ,
            productos : await Ambiente.productos( n ).then(response => {
                console.log(response)
                return response.data
            })
        })
    }))
	.then(response => [ self.anterior, self.siguiente ] = response )
    .then(() => $scope.$digest())

    $(window).on('resize', () => self.ambiente.espacio.resize( $('.imagen').height() , $('.imagen').width()))

    class ambientes_ {
        constructor(arg) {
            this.items = arg.map(n => new alternativa_(n))
        }
    }

    class alternativa_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.obtenerEspacio()
            this.obtenerProductos()
        }
        async obtenerEspacio(){
            this.espacio = await Ambiente.espacio(this.id)
            .then(response => response.data)
            await $scope.$digest()
        }
        async obtenerProductos(){
            this.productos = await Ambiente.productos(this.id)
            .then(response => response.data)
            await $scope.$digest()
        }
    }

    Ambiente.relacionados(id)
    .then(response => self.ambientes = new ambientes_(response.data))
    .then(() => $scope.$digest())


});
