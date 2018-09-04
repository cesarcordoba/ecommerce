angular.module('myapp')

.controller('promocionesCtrl', function($scope, Promocion) {

    const self = this

	class promociones_ {
		constructor(arg) {
            this.items = arg
		}
	}

    Promocion.obtener()
    .then(response => self.promociones = new promociones_(response.data))
    .then(response => console.log(response))
    .then(() => $scope.$digest())


});
