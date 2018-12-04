<?php
  session_start();

  if(empty($_SESSION["counter"])) $_SESSION["counter"] = 1;
  else $_SESSION["counter"] += 1;

  if($_SESSION["counter"] >= 11){
    // $_SESSION["counter"] = null;
    header("Location: blocked.php");
  }

  //Login
  if(isset($_POST["Login"])){
    if(isset($_POST["username"]) && isset($_POST["password"])){

      $username = $_POST["username"];
      $password = $_POST["password"];
      
      $conn = new mysqli("epldb.c5avk8etpgo6.eu-west-2.rds.amazonaws.com", "cchris33", "dkUMv7rU", "epldb") or die($conn->connect_error);
      $query = "SELECT * FROM epldb.Users WHERE username='" . $username . "'";
      $success = $conn->query($query);
      $success = $success->fetch_assoc();
      if($success){
        $hash = $success["password"];
        $check = password_verify($password, $hash);
        if($check){
          // session_start();
          $_SESSION["authentication"] = "true";
          header("Location: index.php");
        }// else header("Location: login.php");
      }// else header("Location: login.php");
    }// else header("Location: login.php");
  }

  //Signup
  // else if(isset($_POST["Signup"])){
  //   if(isset($_POST["username"]) && isset($_POST["password"])){
  //     $username = $_POST["username"];
  //     $password = $_POST["password"];

  //     $hash = password_hash($password, PASSWORD_BCRYPT);
  //     if($hash){
  //       $conn = new mysqli("epldb.c5avk8etpgo6.eu-west-2.rds.amazonaws.com", "cchris33", "dkUMv7rU", "epldb") or die($conn->connect_error);
  //       $query = "INSERT INTO epldb.Users(username,password) VALUES('" . $username . "','" . $hash . "')";
  //       $success = $conn->query($query);
  //       if($success){
  //         session_start();
  //         $_SESSION["authentication"] = "true";
  //         header("Location: index.php");
  //       } else header("Location: login.php");
  //     } else header("Location: login.php");
  //   } else header("Location: login.php");
  // }
?>
<html class="login-page">
  <head>
    <link rel="stylesheet" href="style.css"/>
  </head>

  <body>
    <form action="login.php" method="POST" class="popup login-form">
      <div class="login-title">PV Annotation System</div>
      <div class="login-attempts">Attempts left: <?php echo((10 - $_SESSION["counter"]) + 1); ?></div>
      <div class="input-label login-label">Username:</div>
      <input name="username" class="input-input login-input">
      <div class="input-label login-label">Password:</div>
      <input name="password" type="password" class="input-input login-input">
      <!-- <button class="button login-button" name="Signup" type="submit">Signup</button> -->
      <button class="button login-button" name="Login" type="submit">Login</button>
    </form>
  </body>
</html>