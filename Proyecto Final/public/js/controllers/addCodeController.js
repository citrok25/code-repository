myApp.controller('AddCodeController',['$scope', '$http' , function($scope, $http){

	$scope.formData = {};
    $scope.message = '';
    $scope.formData.fecha = setDate();

 	// Función que fija la fecha actual
   function setDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //Enero es 0
        var yyyy = today.getFullYear();

        // Si el día es menor a 10, lo muestra en formato "05"
        if (dd < 10) {
            dd = '0' + dd;
        }
        // Si el mes es menor a 10, lo muestra en formato "03"
        if (mm < 10) {
            mm = '0' + mm;
        }

        today = dd + '-' + mm + '-' + yyyy;
        return today;
    } 

	$scope.addCode = function () {
		console.log('entra')
		$http.post('/api/addCode', $scope.formData )
			.success(function(data) {
				$scope.formData = {};
                $scope.message = 'Código enviado'

                // Se hace una llamada al servidor para volver a cargar los códigos
                $http.get('/api/codes')
                .then(function (data){
                    $scope.codes = data.data.codes;
                })
			})
			.error (function (data) {
				console.log('Error: ' +data)
			})
	}
}])