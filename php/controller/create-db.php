<?php

//this looks for database.php
require_once(__DIR__ . "/../model/config.php");
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT, "
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL, "
        . "salt char(128) NOT NULL, "
        . "exp int (4), "
        . "exp1 int (4), "
        . "exp2 int (4), "
        . "exp3 int (4), "
        . "exp4 int (4), "
        . "PRIMARY KEY (id))");
if($query) {
		//checks if the table was created successfully
		echo "<p>Successfully created table: users</p>";
	}
	else{
		//added a session variable, which preserves info
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
	