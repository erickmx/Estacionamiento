<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$consulta =("SELECT * FROM LugarE");
	$resultado = mysqli_query($conexion,$consulta);
	while($columna=mysqli_fetch_assoc($resultado)) {
		echo $columna['Id'];
		echo " ";
		echo $columna['Lat'];
		echo " ";
		echo $columna['Lng'];
		echo " ";
		echo $columna['User'];
		echo " ";
		echo $columna['Placas'];
		echo " ";
	}
?>