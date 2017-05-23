<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$usuario = mysqli_real_escape_string($conexion, $data->usuario);
	$consulta="SELECT COUNT(NumReporte) as FROM NOTIFICACIONES WHERE Destino=$usuario'";
	$resultado = mysqli_query($conexion,$consulta);
	var_dump($resultado);
?>