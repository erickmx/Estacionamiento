<?php
	session_start();
	$usuario=$_SESSION["us"];
	$tipo=$_SESSION["tp"];
	$conexion = new mysqli("localhost","root","","estacionamiento");
	$data = json_decode(file_get_contents("php://input"));
	$consulta =("SELECT * FROM invitado WHERE usuario= '$usuario'");
	$resultado = mysqli_query($conexion,$consulta);
	$columna=mysqli_fetch_assoc($resultado);
	echo $columna['Usuario'];
	echo " ";
	echo $columna['Pass'];
	echo " ";
	echo $columna['Nombre'];
	echo " ";
	echo $columna['Apellido'];
	echo " ";
	echo $columna['Telefono'];
	echo " ";
	echo $columna['Correo'];
	echo " ";
	echo $columna['Placas'];
	echo " ";
	echo $columna['Estacionado'];
?>