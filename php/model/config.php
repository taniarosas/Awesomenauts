<?php

//this looks for database.php file
require_once(__DIR__ . "/Database.php");
//starts the session variable
session_start();

session_regenerate_id(true);

//a variable that stores our path to our project
$path = "/Awesomenauts/php/";

// this is where you store info
//*note you dont need a closing tag when there is only php
// you are storing database server information here
$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";

//checks if the variable has been set and reverses the output
if (!isset($_SESSION["connection"])) {

    //created a new object 
    $connection = new Database($host, $username, $password, $database);
    //added a session variable which preserves information
    $_SESSION["connection"] = $connection;
}


