<?php

//require the config file to get to the $path variable
require_once(__DIR__ . "/../model/config.php");

//when it is required by a by webpage they will have access to the function
//and the file will be able to use this function to determine whether or not the user is logged in
function authenticateUser() {
    //checks if theres a session variable and if its true
    //if its not true or not set if the variable is set but not true that means the user isnt logged in
    //using an if statemnt to check if session authenticated hasnt been set
    if (!isset($_SESSION["authenticated"])) {
        return false;
    } else {
        //checking session variable has info
        if ($_SESSION["authenticated"] != true) {
            return false;
        } else {
            return true;
        }
    }
}