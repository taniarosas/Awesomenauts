<?php

//this looks for database.php
require_once(__DIR__ . "/../model/config.php");


//the query creates a table
//the table is to put info in it
//the table is called post and it must have id, title, and post text
//the table must be NOT NULL(not empty)
//added a session variable
//the table echos out the date and time
$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "title varchar(255) NOT NULL,"
        . "post text NOT NULL,"
        . "DateTime datetime NOT NULL, "
        . "PRIMARY KEY (id) )");
//check to see if the table is created successfully
/* if($query) {
  echo "<p>Successfully created a table posts</p>";
  }
  else{
  //added a session variable which preserves a variable
  echo "<p>" . $_SESSION["connection"]->error . "</p>";
  }
 */
//the query creates a table 
//the table stores users
//the table is called users 
//the table must not be empty 
//we added a session variable
$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT, "
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL, "
        . "salt char(128) NOT NULL, "
        . "PRIMARY KEY (id))");
/*if($query) {
		//checks if the table was created successfully
		echo "<p>Successfully created table: users</p>";
	}
	else{
		//added a session variable, which preserves info
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
	*/