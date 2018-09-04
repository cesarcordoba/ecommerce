app.controller('Ctrl', function ( $scope, $rootScope, $location, $state, Session, $window) {

if ($location.url().length > 30) {
		Session.create($location.url().split('/')[1])  
    }
});
