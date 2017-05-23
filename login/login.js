var app = angular.module('hmml',[]);
app.controller('Controlador',function ($scope,$http) {
	$scope.mostrar=true;
	$scope.mostrar2=true;
	$scope.mostrar3=false;
	$scope.error=false;
	$scope.usuario;
	$scope.contra;
	$scope.nombre;
	$scope.apellido;
	$scope.correo;
	$scope.telefono;
	$scope.placas;
	$scope.tipo;
	$scope.aux;
	$scope.cambio = function() {
		$scope.mostrar=!$scope.mostrar;
		$scope.mostrar2=true;
		$scope.error=false;
	}
	$scope.entrar = function() {
		$http.post("login/login.php",{'user': $scope.usuario,'pass': $scope.contra})
		.then(function(data, status, headers, config) {
			if(data.data==='wrong') {
				$scope.errorMsg="Contraseña o usuario incorrectos";
				$scope.error=true;
				$scope.usuario=$scope.contra="";
			}
			else {
				$scope.error=false;
				if(data.data==0)
					window.location.href='inicioi/inicioi.html';
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
			$scope.errorMsg='Error no se pudo lograr la conexion';
			$scope.error=true;
		});
	}
	$scope.comprobar = function() {
		$http.post("login/comprobar.php",{'codigo': $scope.usuario,'nip': $scope.contra})
		.then(function(data, status, headers, config) {
			if(data.data==0) {
				$scope.errorMsg="Contraseña o usuario incorrectos";
				$scope.error=true;
				$scope.usuario=$scope.contra="";
			}
			else {
				$scope.aux=data.data.split(",");
				$scope.tipo=$scope.aux[0].charAt(1);
				$scope.nombre=$scope.aux[2];
				$scope.apellido=" ";
				$scope.error=false;
				$scope.mostrar2=false;
				$scope.mostrar3=false;
			}
		})
		,(function(data,status,headers,config) {
			$scope.errorMsg='Error no se pudo lograr la conexion';
			$scope.error=true;
		});
	}
	$scope.formulario = function() {
		$scope.error=false;
		$scope.mostrar2=false;
		$scope.mostrar3=true;
		$scope.tipo="I";
	}
	$scope.registrar = function() {
		$http.post("login/existe.php",{'usuario': $scope.usuario,'tipo': $scope.tipo})
		.then(function(data, status, headers, config) {
			if(data.data=="1") {
				$scope.errorMsg="El usuario ya existe";
				$scope.error=true;
			}
			else {
				$http.post("login/registrar.php",
					{
						'usuario': $scope.usuario,
						'contra': $scope.contra,
						'nombre': $scope.nombre,
						'apellido': $scope.apellido,
						'correo': $scope.correo,
						'telefono': $scope.telefono,
						'placas': $scope.placas,
						'tipo': $scope.tipo
					})
				.then(function(data, status, headers, config) {
					console.log(data.data);
					if(data.data=="9") {
						$scope.errorMsg="Error no se pudo registrar el usuario";
						$scope.error=true;
					}
					else {
						window.location.href='index.html';
					}
				})
				,(function(data,status,headers,config) {
					$scope.errorMsg='Error no se pudo lograr la conexion';
					$scope.error=true;
				});
			}
		})
		,(function(data,status,headers,config) {
			$scope.errorMsg='Error no se pudo lograr la conexion';
			$scope.error=true;
		});
	}
});
