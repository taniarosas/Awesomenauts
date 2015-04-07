<?php

//requiring the config file
//this is going to be for creating a user
require_once(__DIR__ . "/../model/config.php");
//we are creating a variable named username
//were filtering an input and getting it from the post method
//sanitizing the input username by string 
//getting it by the name username
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
//we are creating a variable named password 
//were filtering an input and getting it from the post method
//getting it by the name password
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//using $5$ 5000 times
//uniqid generates a random number
//this variable creates a hash so that passwords are unique and protected
$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";
//using password n salt to create a crypt password
$hashedPassword = crypt($password, $salt);
//creating a query variable
//using the session because it has a connection and this connection is a connection to our databse
//we are querying
//were inserting in the users table and setting info "space needs to be after set"
$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "email = '',"
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt',"
        . "exp = 0,"
        . "exp1 = 0, "
        . "exp2 = 0, "
        . "exp3 = 0, "
        . "exp4 = 0");
$_SESSION["name"] = $username;
if ($query) {
	//need this for Ajax on index.php
    echo "true";
} else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
