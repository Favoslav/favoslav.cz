<!DOCTYPE php>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yiff-DB</title>
  <link rel="shortcut icon" href="https://www.favoslav.cz/yiff_db/imgs/7w7.png">
  <link type="image/x-icon" rel="icon" href="https://www.favoslav.cz/yiff_db/imgs/7w7.png">
  <link type="image/x-icon" rel="apple-touch-icon" href="https://www.favoslav.cz/yiff_db/imgs/7w7.png">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Fvslv_ - Yiff DataBase">
  <meta property="og:description" content="7w7">

  <meta property="og:image" content="https://www.favoslav.cz/yiff_db/imgs/7w7.png">

  <meta name="theme-color" content="#FF0000">
  <meta name="msapplication-navbutton-color" content="#FF0000">
  <meta name="apple-mobile-web-app-status-bar-style" content="#FF0000">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@Favoslav_">
  <meta name="twitter:creator" content="@fvslv_">
  <meta name="twitter:title" content="Fvslv_ - Yiff DataBase">
  <meta name="twitter:description" content="7w7">
  <meta name="twitter:image" content="https://www.favoslav.cz/yiff_db/imgs/7w7.png">
  <meta name="robots" content="noindex">

  <style>
    <?php include "/var/www/favoslav.cz/yiff_db/style.css" ?>
  </style>

</head>

<body>
  <?php
  session_start();
  require("/usr/local/db_conf.php");
  $dbname = "yiff_db";
  $conn = mysqli_connect($hostname, $username, $password, $dbname);

  if (!$conn) {
    die("Unable to connect");
  }

  if ($_POST) {
    // CTID === 0 -basic, 1 -ab-dl, 127 -admin
    $pass = mysqli_real_escape_string($conn, $_POST["password"]);
    $hashedPassword = hash('sha256', $pass);
    $hashedPassword = mysqli_real_escape_string($conn, $hashedPassword);
    $sql = "SELECT * FROM yiff_db_secstor WHERE pass = '$hashedPassword'";
    $result = mysqli_query($conn, $sql);
    require("/usr/local/session.php");
  }

  echo 
    '<div class="div1">
      <p class="text">Wait a second stranger!<br> This yiff database is protected by password and it has a NSFW content.<br> Are you sure you want to proceed?</p><br><br>

      <form action="#" method="POST" autocomplete="off" class="form1">
        <input class="password" type="password" name="password" placeholder="********"><br>
        <input class="submit" type="submit" name="login" value="Login">
      </form>
      <a class="login2" href="https://discord.com/api/oauth2/authorize?client_id=1040725961089503302&redirect_uri=https%3A%2F%2Ffavoslav.cz%2Fyiff_db%2Fprocess-oauth.php&response_type=code&scope=identify%20guilds"><img class="discord" src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png" alt="Discord Logo" width="30"> &nbsp; &nbsp; &nbsp; &nbsp; Login with Discord</a>
    </div>';
    // <a style="color:rgb(208, 173, 226);" href="https://favoslav.cz/yiff_db/allu.php">Allowed users list (discord login).</a><br>
    // <p class="text">Announcement: </p> <a href="https://dsc.favoslav.cz" class="text2">All paswords were reseted. Contact the owner for new passwords!</a>

  if($_SESSION['loginfailed']) {
    echo '<script>alert("Your discord id is not listed in \'Allowed users list\'.\nContact the administrator for access.");</script>';
    $_SESSION['loginfailed'] = false;
  } else {
    $_SESSION['loginfailed'] = false;
  }
  ?>
</body>
</html>
