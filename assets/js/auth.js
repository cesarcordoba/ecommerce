app.factory('Auth', function($window, $http, Session, Desencriptar, $localStorage, $rootScope, alertas, $state, Usuario) {

    var authService = {};

    authService.registro = function(usuario) {

        Usuario.registro(usuario)
        .then(res => Session.create(res.data.token))
        .then(res => alertas.mostrarToastEstandar("Usuario Registrado"))

    };

    authService.login = (usuario) => {
      Usuario.login(usuario)
        .then(res =>  Session.create(res.data.token))
        .then(res => Desencriptar.desencriptar($localStorage.usuario))
        $rootScope.logueado = true;


            
    };

    authService.logout = function() {
        Session.destroy();
        $state.go('home')
    };

    authService.update = function(user) {
        return $http.post( '/user/update', user).then(function(resp) {
            if (resp.status === 200) {
                Session.create(resp.data);
            }
            return resp;
        });
    };

    return authService;
});

app.service('Session', function($localStorage) {

    this.create = (data) => {
        $localStorage.$reset()
        $localStorage.usuario = data;
    }

    this.destroy = () => $localStorage.$reset()

});

app.service('Desencriptar', function(Usuario, Session, $state, alertas) {

    this.desencriptar = (token) => {
        Usuario.token(token)
        .then(res => res.data.user != undefined ? (Session.create(res.data.user), $state.go('perfil.infobasica')) : alertas.mostrarToastEstandar("No se encuentra el usuario"))
    }

});