<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$usuario = mysqli_real_escape_string($conexion, $data->usuario);
	$consulta="SELECT * FROM LugarE WHERE User='$usuario'";
	$resultado = mysqli_query($conexion,$consulta);
	$columna=mysqli_fetch_assoc($resultado);
	$contador = mysqli_num_rows($resultado);
	if($contador==1) {
		echo $columna['Id'];
		echo " ";
		echo $columna['Lat'];
		echo " ";
		echo $columna['Lng'];
		echo " ";
		echo $columna['User'];
		echo " ";
		echo $columna['Placas'];
	}
	else
		echo "0";
?>