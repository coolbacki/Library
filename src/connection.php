<?php

require_once(dirname(__FILE__) . "/config.php");
require_once(dirname(__FILE__) . "/book.php");


$conn = new mysqli($servername, $username, $password, $basename);
if ($conn->connect_errno) {
    die("Polaczenie nieudane. blad " . $conn->connect_error);
}

Book::SetConnection($conn);

?>



