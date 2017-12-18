myApp.controller('LoginController', ['$scope', '$location','$http', function($scope, $location,$http){

	$scope.formData = {};

	$scope.togglePassword = function () { $scope.typePassword = !$scope.typePassword; };

	$http.get('/api/user')
		.then(function(data) {
			console.log('entra')
			console.log(data)
			$scope.users = data.data.users;
		})


// Function that sends the information data through a location server or to a database
    $scope.login = function(formData) {
    	/*
    	// Comprueba si el campo "user" del formulario es null, indefinido o está vacío. Si es así, muestra un mensaje de error
    	if (angular.isUndefined($scope.formData.user) || $scope.formData.user == null || $scope.formData.user == "") {
    		$scope.errorUser = "Debes rellenar el campo Usuario";
    		return;
    	}
		
		// Comprueba si el campo "pass" del formulario es null, indefinido o está vacío. Si es así, muestra un mensaje de error
    	if (angular.isUndefined($scope.formData.pass) || $scope.formData.pass == null || $scope.formData.pass == "") {
    		$scope.errorPass = "Debes rellenar el campo Contraseña";
    		return;
    	}
		*/


    	// Utilizar linQ para buscar usuario en la lista de usuarios, comprobar que la contraseña es la del usuario y hacer loggin
    	var user = Enumerable.From($scope.users)
    		.Where(function(x) {return x.user == $scope.formData.user})
    		.Select(function(x) {return x })
    		.FirstOrDefault();

    	console.log(user)
    	// Guardar cookie para mostrar códigos pendientes al ir a esa vista

    	// Redirigimos a inicio si el loggin es correcto
        //$location.path('/contact-success');  // Where the location service is located (path)
        // In this case, we redirect to a page that show a message
    }
}]);


