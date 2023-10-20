<?php
session_start();
date_default_timezone_set("Europe/Prague");

if (!$_SESSION['logged_in']) {
  header('Location: index.php');
  exit();
} else if ($_SESSION['logged_in']) {
  extract($_SESSION['userData']);

  $json_content = file_get_contents("discord_ids.json");
  $json_array = json_decode($json_content, true);

  if (in_array($discord_id, $json_array["ids"])) {
    $directory = '/var/www/favoslav.cz/yiff_db/logins/dauth';
    $file = $username . " ($discord_id)" . '.txt';
    $content = date("d-m-Y h:i:s") . PHP_EOL;

    if (!file_exists($directory)) {
      mkdir($directory, 0777, true);
    }

    $file_path = $directory . '/' . $file;
    file_put_contents($file_path, $content, FILE_APPEND);

    $_SESSION["ShAdZnFjE49rRtE5XbgnrWUefv8jaQ"] = "ljJ4g3dqTtU5eL0nNXKB79MCsvQkcyVpWO1wHGSAuZmiDz6bo8";
    header("Location: http://favoslav.cz/yiff_db/yiffdb_col/yiff.php");
  } else {
    $_SESSION['loginfailed'] = true;
    header("Location: http://favoslav.cz/yiff_db/");
  }
}
?>