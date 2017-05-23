var map;
var ilat=20.6551124,ilng=-103.3240812;
var marcas=[];
var aux=[];
var map;
var largeInfowindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:ilat, lng:ilng},
				zoom: 19
	});
	largeInfowindow = new google.maps.InfoWindow();
}
function populateInfoWindow(marca,infowindow) {
	if(infowindow.marker!=marca)
		infowindow.marker = marca;
	infowindow.setContent('<div>Lugar: '+marca.id+'<br>Usuario: '+marca.usuario+'<br>Placas: '+marca.placas+'<br>'+'</div>');
	infowindow.open(map,marca);
	infowindow.addListener('closeclick',function(){infowindow.setMarker=null;});
}
function marcar(data) {
	largeInfowindow = new google.maps.InfoWindow();
	for(m in aux) {
		aux[m].setMap(null);
	}
	var marca = new google.maps.Marker({
		position: {lat:parseFloat(data[1]), lng:parseFloat(data[2])},
		map: map,
		title: data[0],
		id: data[0],
		usuario: data[3],
		placas: data[4]
	});
	marca.addListener('click', function() {
		populateInfoWindow(this,largeInfowindow);
	});
}
function limpiar(posicion) {
	largeInfowindow = new google.maps.InfoWindow();
	for(m in aux) {
		aux[m].setMap(null);
	}
	var marca = new google.maps.Marker({
		position: {lat:parseFloat(marcas[(posicion*5)+1]), lng:parseFloat(marcas[(posicion*5)+2])},
		map: map,
		title: marcas[(posicion*5)],
		id: posicion,
		usuario: marcas[(posicion*5)+3],
		placas: marcas[(posicion*5)+4]
	});
	marca.addListener('click', function() {
		populateInfoWindow(this,largeInfowindow);
	});
}
function cargar(data) {
	marcas=data.split(" ");
	for(var i=0;i<10;++i) {///317
		if(marcas[(i*5)+3]=="" && marcas[(i*5)+4]=="") {
			var marca = new google.maps.Marker({
				position: {lat:parseFloat(marcas[(i*5)+1]), lng:parseFloat(marcas[(i*5)+2])},
				map: map,
				title: marcas[(i*5)],
				id: (i+1),
				usuario: marcas[(i*5)+3],
				placas: marcas[(i*5)+4]
			});
			aux.push(marca);
			marca.addListener('click', function() {
				populateInfoWindow(this,largeInfowindow);
			});
		}
	}
}
var app = angular.module('hmml',[]);
app.controller('Controlador',function ($scope,$http) {
	$scope.estacionado;
	var datos = [];
	var placas;
	var usuario;
	var temporal;
	$scope.errorMsg;
	$scope.error=false;
	$scope.estacionado=false;
	$scope.Lugar;
	$scope.verEstacionamiento=true;
	$scope.notificaciones=0;
	$scope.cambio=function() {
		$scope.verEstacionamiento=!$scope.verEstacionamiento;
	}
	$scope.iniciar = function() {
		$http.post("inicioi.php")
		.then(function(data,status,headers,config) {
			if(data.data==='0') {
				$scope.error=true;
				$scope.errorMsg="No se pudo obtener los datos";
			}
			else {
				$scope.error=false;
				datos=data.data.split(" ");
				usuario=datos[0];
				placas=datos[1];
				if(datos[2]==1)
					$scope.estacionado=true;
				else
					$scope.estacionado=false;
				$http.post("reportes.php",{'usuario': usuario})
				.then(function(data,status,headers,config) {
					console.log(data.data);
				})
				,(function(data,status,headers,config) {
				$scope.error=true;
				$scope.errorMsg="No se pudo hacer conexion";
		});
			}
		})
		,(function(data,status,headers,config) {
			$scope.error=true;
			$scope.errorMsg="No se pudo hacer conexion";
		});
		$http.post("LugarE.php")
		.then(function(data,status,headers,config) {
			if(data.data=='0')
				$scope.errorMsg="No se pudo cargar los lugares";
			else{
				if($scope.estacionado==1){
					$http.post("posicion.php",{'usuario': usuario})
					.then(function(data,status,headers,config) {
						if(data.data=="0") {
							$scope.error=true;
							$scope.errorMsg="No se pudo cargar los datos";
						}
						else{
							temporal=data.data.split(" ");
							$scope.lugar=temporal[0];
							marcar(temporal);
						}
					})
					,(function(data,status,headers,config) {
						$scope.errorMsg="No se puede acceder a los datos";
					});
				}
				else{
					cargar(data.data);
				}
			}
		})
		,(function(data,status,headers,config) {
			$scope.errorMsg='No se puede acceder a los datos';
		});
	}
	$scope.elegir=function() {
		if($scope.estacionado==true){
			$http.post("estacionar.php",{
				'lugar': $scope.lugar,
				'usuario': usuario,
				'placas': placas,
				'bandera': 1
			})
			.then(function(data,status,headers,config) {
				if(data.data=="0") {
					$scope.error=true;
					$scope.errorMsg="No se pudo desestacionar";
				}
				else {
					$scope.estacionado=false;
					cargar();
				}
			})
			,(function(data,status,headers,config) {
				$scope.errorMsg="No se puede acceder a los datos";
			});

		}
		else {
			$http.post("disponible.php",{'lugar': $scope.lugar})
			.then(function(data,status,headers,config) {
				if(data.data=="2") {
					$scope.error=true;
					$scope.errorMsg="El lugar no existe";
				}
				else if(data.data=="1") {
					$scope.error=false;
					$http.post("estacionar.php",
						{
							'lugar': $scope.lugar,
							'usuario': usuario,
							'placas': placas,
							'bandera': 0
						})
					.then(function(data,status,headers,config) {
						if(data.data=="0") {
							$scope.error=true;
							$scope.errorMsg="No se pudo estacionar";
						}
						else if(data.data=="1"){
							limpiar($scope.lugar);
							$scope.estacionar=true;
						}
						else
							console.log(data.data);
					})
					,(function(data,status,headers,config) {
						$scope.errorMsg='No se puede acceder a los datos';
					});
				}
				else {
					$scope.error=true;
					$scope.errorMsg="El lugar no esta disponible";
				}
			})
			,(function(data,status,headers,config) {
				$scope.errorMsg='No se puede acceder a los datos';
			});
		}
	}
});