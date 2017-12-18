// To protect the variable name we passing the function and any dependencies through an array after the controller
// myApp.controller('NinjaController', [$scope, 'depend', function ($scope, depend) {  }]);

myApp.controller('CodeController',['$scope', '$http', '$location', function($scope, $http,$location){

    //console.log(angular.toJson($scope.ninjas));


    // Collect the data from a json by http.get method
    $http.get('/api/codes')
        .then(function (data){
            console.log(data.data.codes)
            console.log(data.data.codes.length);
            $scope.codes = data.data.codes;
            /*
            *  Pruebas de la respuesta del archivo json/servicio web
            * console.log(data.data);
            * console.log($scope.codes);
            *
            */
        })

    // Variable que controla si se muestra o no la descripción y el link de un código
    $scope.codeExpand = function(code) {
        code.show = !code.show;
    }

    // Function that removes a concrete ninja by his index in the array
    $scope.removeCode = function(id){
        $http.delete('/api/code/'+id)
        .then(function() {
            $scope.message = "El código se ha eliminado con éxito";

            // Se hace una llamada al servidor para volver a cargar los códigos
            $http.get('/api/codes')
                .then(function (data){
                console.log(data.data.codes)
                $scope.codes = data.data.codes;
            })
            console.log('entra')
        })
    }

    $scope.addCode = function (id) {
        $http.put('/api/code/'+id)
            .then(function() {
                $scope.message = "El código se ha aceptado"


            })
    }
}]);

// Mostrar los tres últimos códigos añadidos a la lista de códigos
// Directiva que muestra un código aleatorio en la página de inicio
myApp.directive('randomCode', [function () {

    return {
        restrict: 'E',
        scope: {
            codes: "=" // Enlaza los códigos con los atributos de la directiva en home.html
            /*
             * La forma de enlazar los datos puede ser de tres tipos:
             *  @ -> Se usa para acceder a valores String que están definidos fuera de la directiva.
             *  = -> Se usa para crear un enlace en dos direcciones entre el scope externo y el de la directiva.
             *  & -> Permite pasar una función que la directiva puede usar.
             *
             */
        },
        templateUrl: 'views/randomCode.html', // URL donde se ejecuta la directiva
        transclude: true, // Permite ejecutar la directiva dentro de otro módulo o vista de la aplicación
        controller: function($scope){
            $scope.random = Math.floor(Math.random() * 6);//  Assign a random number (5 are the elements
            // of the array)
        }
    };
}]);