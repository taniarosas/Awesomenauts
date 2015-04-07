<?php

//require the config file to get to the $path variable
require_once(__DIR__ . "/../model/config.php");
//to get rid/delete the variable authenticated
unset($_SESSION["authenticated"]);
//destroy the remaining variables
session_destroy();
//this redirects the user to index page
header("Location: " . $path . "index.php");