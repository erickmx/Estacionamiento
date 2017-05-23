<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	if($data->tipo=="A")
		$consulta = ("SELECT usuario FROM ALUMNO WHERE usuario= '$data->usuario'");
	else if($data->tipo=="I")
		$consulta = ("SELECT usuario FROM INVITADO WHERE usuario= '$data->usuario'");
	else
		$consulta = ("SELECT usuario FROM MAESTRO WHERE usuario= '$data->usuario'");
	$resultado = mysqli_query($conexion,$consulta);
	$columna = mysqli_fetch_assoc($resultado);
	$contador = mysqli_num_rows($resultado);
	if($contador==1)
		echo "1";
	else
		echo "0";
?>