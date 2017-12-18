// Creación del módulo y declaración de las directivas/extensiones que usará la aplicación
var myApp =  angular.module('myApp', ['ngRoute','ngAnimate']);

// Configuración de la aplicación (RouteProvider -> Manejo de las vistas y la redirección entre las mismas)
// La configuración se ejecuta antes de que se cargue la aplicación Angularjs
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'CodeController'
        })
        .when('/codigos', {
            templateUrl: 'views/codigos.html',
            controller: 'CodeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/login-success', {
            templateUrl: 'views/loginSuccess.html',
            controller: 'LoginController'
        })
        .when('/enviar-codigo', {
            templateUrl: 'views/addCode.html',
            controller: 'AddCodeController'
        }) 
        .when('/administrar-codigos', {
            templateUrl : 'views/manageCodes.html',
            controller: 'CodeController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
