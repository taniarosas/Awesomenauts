<?php
//require the config file to get to the $path variable
require_once(__DIR__ . "/../model/config.php");
$array = array (
	'exp'=> ' ',
		'exp1'=> ' ',
	'exp2'=> ' ',
		'exp3'=> ' ',
	'exp4'=> ' ',
);
//need the variable for username and need to filter the input and store input
//input post is the method for posting
//need to filter and sanitize info going in
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
//need the variable for password and need to filter the input and store input
//input post is the method for posting
//need to filter and sanitize info going in
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
//selects our salt and password from our users table when our username is = to the username that the user input
//this query selects a username and password that match the users information
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");
//this function checks to see if the login info matches the login info from our database
if ($query->num_rows == 1) {
    $row = $query->fetch_array();
    //this if statement runs the login info in the database and the 3 equal signs check to use if the login onfo matches
    if ($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp"] = $row["exp"];
        $array["exp1"] = $row["exp1"];
        $array["exp2"] = $row["exp2"];
        $array["exp3"] = $row["exp3"];
        $array["exp4"] = $row["exp4"];
        echo json_encode($array);
    } else {
        echo "<p>Invalid username and password</p>";
    }
} else {
    echo "<p>Invalid username and password</p>";
}
