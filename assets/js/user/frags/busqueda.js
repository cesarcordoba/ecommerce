var app = angular.module('myapp');

app.controller('busquedaCtrl', function($scope, $mdDialog) {

    self.BuscarMarcasChange = function(text) {}
    self.MarcasSeleccionadoChange = function(item) {

        item
            ? ($scope.peticion.where.IdColor = item.id, filtro())
            : (delete $scope.peticion.where.IdColor, filtro())
    }

    $scope.iconofiltro = 'tune';

    $scope.mostrarfiltro = function(ev) {
        $scope.iconofiltro = $scope.iconofiltro === 'tune'
            ? $scope.iconofiltro = 'clear'
            : $scope.iconofiltro = 'tune';

        $mdDialog.show({
            controller: function($scope, $mdDialog) {

                console.log('si se pudo')

                $scope.hide = function() {
                  $mdDialog.hide();
                };

                $scope.cancel = function() {
                  $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                  $mdDialog.hide(answer);
                };


            },
            templateUrl: '/user/filtro',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }

    $scope.carteles = [
        {},
        {},
        {},
        {},
        {}, {}, {}, {}, {}, {}, {}, {}
    ];

    $scope.currentPage = 0;

    $scope.paging = {
        total: 100,
        current: 1,
        onPageChanged: loadPages
    };

    function loadPages() {
        console.log('Current page is : ' + $scope.paging.current);

        // TODO : Load current page Data here

        $scope.currentPage = $scope.paging.current;
    }

});


app.controller('DialogController', );
