<?php
require 'connect.php';
$conn    = Connect();

  $query = "SELECT * FROM PV";
  $result=$conn->query($query);
  $outArray = array();
  if ($result) {
    while ($row = $result->fetch_assoc()) $outArray[] = $row;
    echo json_encode($outArray);
  }
  else echo "Error";
?>
