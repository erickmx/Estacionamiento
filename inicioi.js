var app = angular.module('hmml',[]);
app.controller('Controlador',function ($scope,$http) {
	$scope.datos = [];
	$scope.iniciar = function() {
		$http.post("inicioi.php")
		.then(function(data,status,headers,config) {
			if(data.data==='wrong')
				$scope.errorMsg="Login not correct";
			else {
				console.log(data.data);
			}
		})
		,(function(data,status,headers,config) {
			$scope.errorMsg='Unable to LOGIN';
		});
	}
});