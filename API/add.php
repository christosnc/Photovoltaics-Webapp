<?php
require 'connect.php';
$conn = Connect();

$id = isset($_POST['id']) ? $_POST['id'] : "''";
$name = isset($_POST['name']) ? "'". $_POST['name'] . "'" : "''";
$photo = isset($_POST['photo']) ? "'". $_POST['photo'] . "'" : "''";
$address = isset($_POST['address']) ? "'". $_POST['address'] . "'" : "''";
$longitude = isset($_POST['longitude']) ? "'". $_POST['longitude'] . "'" : "''";
$latitude = isset($_POST['latitude']) ? "'". $_POST['latitude'] . "'" : "''";
$operator = isset($_POST['operator']) ? "'". $_POST['operator'] . "'" : "''";
$commision_date = isset($_POST['commision_date']) ? "'". $_POST['commision_date'] . "'" : "''";
$description = isset($_POST['description']) ? "'". $_POST['description'] . "'" : "''";
$power = isset($_POST['power']) ? "'". $_POST['power'] . "'" : "''";
$production = isset($_POST['production']) ? "'". $_POST['production'] . "'" : "''";
$avoided = isset($_POST['avoided']) ? "'". $_POST['avoided'] . "'" : "''";
$reimbursement = isset($_POST['reimbursement']) ? "'". $_POST['reimbursement'] . "'" : "''";
$modules = isset($_POST['modules']) ? "'". $_POST['modules'] . "'" : "''";
$azimuth = isset($_POST['azimuth']) ? "'". $_POST['azimuth'] . "'" : "''";
$inclination = isset($_POST['inclination']) ? "'". $_POST['inclination'] . "'" : "''";
$inverter = isset($_POST['inverter']) ? "'". $_POST['inverter'] . "'" : "''";
$communication = isset($_POST['communication']) ? "'". $_POST['communication'] . "'" : "''";

if ($name != '' && $longitude != '' && $latitude != '') {

if($id != '') $query   = "UPDATE epldb.PV SET name={$name},photo={$photo},address={$address},longitude={$longitude},latitude={$latitude},operator={$operator},commision_date={$commision_date},description={$description},power={$power},production={$production},avoided={$avoided},reimbursement={$reimbursement},modules={$modules},azimuth={$azimuth},inclination={$inclination},inverter={$inverter},communication={$communication} WHERE id=" . $id;
    else $query   = "INSERT into epldb.PV (name,photo,address,longitude,latitude,operator,commision_date,description,power,production,avoided,reimbursement,modules,azimuth,inclination,inverter,communication) VALUES(" . $name . "," .  $photo . "," .  $address . "," .  $longitude . "," .  $latitude . "," .  $operator . "," .  $commision_date . "," . $description . "," .  $power . "," .  $production . "," .  $avoided . "," .  $reimbursement . "," .  $modules . "," . $azimuth . "," .  $inclination . "," . $inverter . "," .  $communication  . ")";
    $success = $conn->query($query);

		echo($query);
		if($success) {
		$lastid=$conn->insert_id;
		echo $lastid;}

		else echo "Error";}

		$conn->close();

?>
