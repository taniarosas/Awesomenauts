<?php

//this class serves as a packet and holds all the private variables
//a class is a collection of variables
//it creates an object that connects to the database
class Database {

    //private makes the variables unavailable to other classes
    private $connection;
    //private makes the variables unavailable to other classes
    private $host;
    //private makes the variables unavailable to other classes
    private $username;
    //private makes the variables unavailable to other classes
    private $password;
    //private makes the variables unavailable to other classes
    private $database;
    //created a public variable so it could be used anywhere
    public $error;

    //local variables
    //it is the consructor for the class
    //this construct function is needed to make objects
    public function __construct($host, $username, $password, $database) {
        //setting the global variables to our local variables
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;

        // it looks for those variables
        $this->connection = new mysqli($host, $username, $password);

        //checks if there is an error in your connection
        if ($this->connection->connect_error) {
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }

        //it checks if select_db exists
        $exists = $this->connection->select_db($database);
        //it checks to see if database doesnt exists
        if (!$exists) {

            //if not then it creates one
            $query = $this->connection->query("CREATE DATABASE $database");
            if ($query) {
                // if it created it prints out the sentence
                echo "<p>Successfully created database: " . $database . "</p>";
            }
        }
        //database is already there
        else {
            echo "<p>Database already exists</p>";
        }
    }

    //a function will be executed by a call to the function
    //this function opens the connection
    public function openConnection() {
        //it establishes a new conection
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

        //checks if there is an error in your connection
        if ($this->connection->connect_error) {
            //it outputs error
            die("<p>Error: " . $this->connection->connect_error . "</p>");
        }
    }

    //this function closes the connection
    public function closeConnection() {
        //to check if you opened the connection
        //isset is checking if the variable has been set
        if (isset($this->connection)) {
            //if its true close the connection
            $this->connection->close();
        }
    }

    //every time we call the query we have to write a string
    //in the end it will be passed as a variable 
    public function query($string) {
        //to run the openfunction which will open the connection
        $this->openConnection();
        //to query the connection we have 
        $query = $this->connection->query($string);

        //reverses the query to output the false
        if (!$query) {
            //uses the error variable
            $this->error = $this->connection->error;
        }

        //closes the connection
        $this->closeConnection();
        //return the result
        return $query;
    }

}