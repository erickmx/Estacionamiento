<?php
	session_start();
	$conexion = new mysqli("localhost","root","","estacionamiento");
	$data = json_decode(file_get_contents("php://input"));
	$username = mysqli_real_escape_string($conexion, $data->user);
	$password = mysqli_real_escape_string($conexion,$data->pass);
	$consulta =("SELECT usuario FROM invitado WHERE usuario= '$username' and pass= '$password'");
	$resultado = mysqli_query($conexion,$consulta);
	$columna=mysqli_fetch_assoc($resultado);
	$countador = mysqli_num_rows($resultado);
	if($countador==1) {
		$_SESSION["us"]=$data->user;
		$_SESSION["tp"]="0";
		echo "0";
	}
	else{
		$consulta =("SELECT codigo FROM alumno WHERE codigo= '$username' and nip= '$password'");
		$resultado=mysqli_query($conexion, $consulta);
		$columna=mysqli_fetch_assoc($resultado);
		$countador = mysqli_num_rows($resultado);
		if($countador==1) {
			$_SESSION["us"]=$data->user;
			$_SESSION["tp"]="1";
			echo "1";
		}
		else {
			$consulta=("SELECT codigo FROM maestro WHERE codigo= '$username' and nip= '$password'");
			$resultado = mysqli_query($conexion, $consulta);
			$columna=mysqli_fetch_assoc($resultado);
			$countador = mysqli_num_rows($resultado);
			if($countador==1) {
			$_SESSION["us"]=$data->user;
			$_SESSION["tp"]="2";
			echo "2";
			}
			else {
				$consulta =("SELECT usuario FROM guardia WHERE usuario= '$username' and pass= '$password'");
				$resultado=mysqli_query($conexion, $consulta);
				$columna=mysqli_fetch_assoc($resultado);
				$countador = mysqli_num_rows($resultado);
				if($countador==1) {
					$_SESSION["us"]=$data->user;
					$_SESSION["tp"]="3";
					echo "3";
				}
				else {
					$consulta=("SELECT usuario FROM administrador WHERE usuario='$username' and pass='$password'");
					$resultado = mysqli_query($conexion, $consulta);
					$columna=mysqli_fetch_assoc($resultado);
					$countador = mysqli_num_rows($resultado);
					if($countador==1) {
						$_SESSION["us"]=$data->user;
						$_SESSION["tp"]="4";
						echo "4";
					}
					else
						echo 'wrong';
				}
			}
		}
	}
?>