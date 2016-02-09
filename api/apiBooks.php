<?php
require_once(dirname(__FILE__) . "/../src/connection.php");


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $tab = Book::LoadFromDB($_GET['id']);
    echo json_encode($tab);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tab = Book::CreateBook($_POST['name'], $_POST['author'], $_POST['description']);
    echo json_encode($tab);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    parse_str(file_get_contents("php://input"),$del_vars);
    $tab = Book::DeleteBook($del_vars['name']);
    echo json_encode($tab);
}

if ($_SERVER['REQUEST_METHOD'] == 'UPDATE') {
    parse_str(file_get_contents("php://input"),$up_vars);
    $tab = Book::UpdateBook($up_vars['id'], $up_vars['newName'], $up_vars['newAuthor'], $up_vars['newDescription']);
    echo json_encode($tab);
}

?>