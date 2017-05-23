	<?php
		$data = json_decode(file_get_contents("php://input"));
		$postdata = http_build_query(array('codigo'=>$data->codigo,'nip'=>$data->nip));
		$opts = array('http'=>array('method'=>'POST','header'=>'Content-type: application/x-www-form-urlencoded','content'=>$postdata));
		$context  = stream_context_create($opts);
		$json = file_get_contents('http://148.202.152.33/ws_temporal.php', false, $context);
		$objson = json_decode($json, true);
		foreach($objson as $dato)
			$info=$dato;
		echo $info;
	?>