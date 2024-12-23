<?php

$host="localhost";
$dbname="tcg";
$username="root";
$password="";

try{
    $pdo=new PDO("mysql:host=$host;dbname=$dbname",$username,$password);
} catch (PDOException $e) {
    die("Connection failed ".$e->getMessage());
}

?>