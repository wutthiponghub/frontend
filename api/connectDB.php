<?php

    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: POST,GET');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header("Content-Type: application/json; charset=UTF-8");

    $conn = new mysqli("localhost", "nguser", "ngpwd001", "angularJSdb");
    $conn->set_charset("utf8");	

?>

