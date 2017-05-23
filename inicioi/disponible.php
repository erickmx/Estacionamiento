<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$lugar = mysqli_real_escape_string($conexion, $data->lugar);
	$consulta = ("SELECT User FROM LugarE WHERE id= '$lugar'");
	$resultado = mysqli_query($conexion,$consulta);
	$columna = mysqli_fetch_assoc($resultado);
	$contador = mysqli_num_rows($resultado);
	if($contador==0) {
		echo "2";
	}
	else if($columna['User']=="")
		echo "1";
	else
		echo "0";
?>