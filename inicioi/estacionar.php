<?php
	$conexion = new mysqli("localhost","root","","estacionamiento");
	//$conexion = new mysqli('localhost','id586923_emm3337','NoPass','id586923_servidor');
	$data = json_decode(file_get_contents("php://input"));
	$lugar = mysqli_real_escape_string($conexion, $data->lugar);
	$placas = mysqli_real_escape_string($conexion, $data->placas);
	$usuario = mysqli_real_escape_string($conexion, $data->usuario);
	$bandera = mysqli_real_escape_string($conexion, $data->bandera);
	if($bandera==0) {
		$consulta="UPDATE LugarE SET Placas='$placas',User='$usuario' WHERE Id='$lugar'";
		if($conexion->query($consulta) === TRUE) {
			$consulta="UPDATE INVITADO SET Estacionado='1' WHERE Usuario='$usuario'";
			if($conexion->query($consulta) === TRUE)
				echo "1";
			else
				echo "0";
		}
		else
			echo "0";
	}
	else {
		$consulta="UPDATE LugarE SET Placas='',User='' WHERE Id='$lugar'";
		if($conexion->query($consulta) === TRUE) {
			$consulta="UPDATE INVITADO SET Estacionado= b'0' WHERE Usuario='$usuario'";
			if($conexion->query($consulta) === TRUE)
				echo "1";
			else
				echo "0";
		}
		else
			echo "0";
	}	
?>
