<?php
require 'connect.php';
$conn    = Connect();

	if (isset($_POST['id'])) {

    $query   ="DELETE FROM PV WHERE id=" . $_POST['id'];
    $success = $conn->query($query);

    if($success) echo $success;
    else echo "Error";
  }
  else echo "Error";
?>
