<?php
  session_start();
  if(empty($_SESSION['authentication']) || $_SESSION['authentication'] != true) header("Location: login.php");
?>