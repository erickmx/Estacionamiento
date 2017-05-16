var app = angular.module('hmml',[]);
app.controller('Controlador',function ($scope,$http) {
	$scope.mostrar=true;
	$scope.error=false;
	$scope.usuario;
	$scope.contra;
	$scope.cambio = function() {
		$scope.mostrar=!$scope.mostrar;
	}
	$scope.entrar = function() {
		$http.post("login.php",{'user': $scope.usuario,'pass': $scope.contra})
		.then(function(data, status, headers, config) {
			if(data.data==='wrong')
				$scope.errorMsg="Login not correct";
			else {
				console.log(data.data);
				if(data.data==0)
					window.location.href='inicioi.html';
				else if(data.data==1)
					window.location.href='inicioa.html';
				else if(data.data==2)
					window.location.href='iniciom.html';
				else if(data.data==3)
					window.location.href='iniciog.html';
				else if(data.data==4)
					window.location.href='iniciox.html';
			}
		})
		,(function(data,status,headers,config) {
			$scope.errorMsg='Unable to LOGIN';
		});
	}
});
