var app = angular.module('myapp');

app.controller('espacioCtrl', function($scope, $stateParams, $mdPanel, Ambiente ) {

    function CrearCanvas( imagen ){

        coordenadas.fillStyle= "#FF0000";
        coordenadas.fillRect(20,20,150,100)

    }

    const
        self = this,
        id = $stateParams.id

    self.medidas = {
        height : 600,
        width : 1000
    }

    class ambiente_ {
        constructor(arg) {
            this.item = arg
            this.medidas = {
                width : 1000,
                height : 600
            }
            this.p = 1
            $scope.$digest()
            this.resize()
            this.obtenerEspacio()
            this.obtenerProductos()
        }
        resize(){
            $(".espacio").css({"width" : this.medidas.width , "height" :  this.medidas.height })
        }
        async obtenerEspacio(){

            var background = document.getElementById("background").getContext("2d")
            var image = new Image()
            image.onload = () =>  background.drawImage( image, 0, 0, 1000, 600 )
            this.espacio = await Ambiente.espacio(this.item.id).then(res => res.data)
            image.src = this.espacio.link
            await $scope.$digest()

        }
        async obtenerProductos(){

            var coordenadas = document.getElementById("coordenadas").getContext("2d")
            paper.install(window)
            paper.setup('coordenadas')

            // var rect = new Path.Rectangle({
            //     point: [0, 0],
            //     size: [1000 , 600],
            //     strokeColor: 'white',
            //     selected: true
            // });
            // rect.sendToBack();
            // rect.fillColor = '#ff0000';

            var tool = new paper.Tool()
            this.productos = await Ambiente.productos(this.item.id).then(res => res.data.map(n => new producto_(n)))
            await $scope.$digest()

            tool.onMouseDown = (event) =>
                this.productos.forEach(n =>
                    n.clicked(event.point.x, event.point.y))

        }

    }

    class producto_ {
        constructor(arg) {
            Object.entries(arg).forEach(n => this[n[0]] = n[1])
            this.dibujar()
            this.r = 10
            this.status = false
            this.dragging = false
            this.procesando = false
        }
        dibujar(){

            console.log(this)

            let punto = new paper.Point(this.posiciones.x, this.posiciones.y)
            this.circulo = new paper.Path.Circle( punto, new paper.Size(10, 10))
            this.circulo.fillColor = 'white';

            this.texto = new PointText(punto);
            this.texto.justification = 'center';
            this.texto.fillColor = 'black';

            this.texto.content = this.nombre;
            this.texto.fontWeight = 40;
        }
        clicked(x, y){

            console.log(dist({ left : x , top: y}, { left : this.posiciones.x * self.ambiente.p, top: this.posiciones.y * self.ambiente.p}, this.r) < this.r)

            if(dist({ left : x , top: y}, { left : this.posiciones.x * self.ambiente.p, top: this.posiciones.y * self.ambiente.p}, this.r) < this.r){

                console.log(x,y)

                let {top , left} = $('#background ').position()

                var item = this

                $mdPanel.open({
                attachTo: angular.element(document.body),
                clickOutsideToClose: true,
                panelClass: 'ficha',
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
                        <Producto producto="ctrl.item"></producto>

                    </md-card>
                `})

            }

        }
    }

    Ambiente.one(id)
    .then(response => self.ambiente = new ambiente_(response.data))
    .then(() => $scope.$digest())

    console.log(this)

    function dist(c1, c2, r){

        var div1x = c1.left + r/2;
        var div1y = c1.top + r/2;


        var div2x = c2.left + r/2;
        var div2y = c2.top + r/2;


        var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
        return distance = Math.sqrt(distanceSquared);

    }


});
