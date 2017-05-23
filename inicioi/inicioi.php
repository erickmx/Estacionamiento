<?php
	session_start();
	$user=$_SESSION["us"];
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$consulta =("SELECT * FROM invitado WHERE usuario= '$user'");
	$resultado = mysqli_query($conexion,$consulta);
	$columna=mysqli_fetch_assoc($resultado);
	$contador = mysqli_num_rows($resultado);
	if($contador==1) {
		echo $columna['Usuario'];
		echo " ";
		echo $columna['Placas'];
		echo " ";
		echo $columna['Estacionado'];
	}
	else
		echo "0";
?>