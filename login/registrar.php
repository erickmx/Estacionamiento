<?php
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$conexion = new mysqli("localhost","root","","estacionamiento");
	$data = json_decode(file_get_contents("php://input"));
	$usuario = mysqli_real_escape_string($conexion, $data->usuario);
	$contra = mysqli_real_escape_string($conexion,$data->contra);
	$nombre = mysqli_real_escape_string($conexion, $data->nombre);
	$apellido = mysqli_real_escape_string($conexion,$data->apellido);
	$correo = mysqli_real_escape_string($conexion, $data->correo);
	$telefono = mysqli_real_escape_string($conexion,$data->telefono);
	$placas = mysqli_real_escape_string($conexion, $data->placas);
	$tipo = mysqli_real_escape_string($conexion,$data->tipo);
	if($data->tipo=="A"){
		$consulta="INSERT INTO ALUMNO VALUES('$usuario','$contra','$nombre','$apellido','$telefono','$correo','$placas','0')";
	}
	else if($data->tipo=="I"){
		$consulta="INSERT INTO INVITADO VALUES('$usuario','$contra','$nombre','$apellido','$telefono','$correo','$placas','0')";
	}
	else{
		$consulta="INSERT INTO MAESTRO VALUES('$usuario','$contra','$nombre','$apellido','$telefono','$correo','$placas','0')";
	}
	if($data->tipo=="A"){
		if($conexion->query($consulta) === TRUE)
			echo "1";
		else
			echo "9";
	}
	else if($data->tipo=="I"){
		if($conexion->query($consulta) === TRUE)
			echo "0";
		else
			echo "9";
	}
	else{
		if($conexion->query($consulta) === TRUE)
			echo "2";
		else
			echo "9";
	}
?>