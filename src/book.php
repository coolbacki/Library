<?php

/*
    CREATE TABLE Books(
    id int AUTO_INCREMENT,
    name varchar(255),
    author varchar(255),
    description varchar(255),
    PRIMARY KEY(id)
    );
*/


class Book
{
    static private $connection; //wspólne połączenie do bazy dla wszystkich userow

    static public function SetConnection(mysqli $newConnection)
    {
        Book::$connection = $newConnection;
    }

    static public function LoadFromDB($id = null)
    {
        $allBooks = [];
        if (null == $id) {
            $sql = "SELECT * FROM Books";
        } else {
            $sql = "SELECT * FROM Books WHERE id = $id";
        }
        $result = self::$connection->query($sql);
        if ($result !== FALSE) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $allBooks[] = $row;
                }
            }
            return $allBooks;
        } else {
            return false;
        }
    }
    static public function CreateBook($newName, $newAuthor, $newDescription)
    {
        $sql = "INSERT INTO Books(name, author, description)
                VALUES ('$newName', '$newAuthor', '$newDescription')";

        $result = self::$connection->query($sql);
        if ($result === true) {
            $newBookId = self::$connection->insert_id;
            return $newBookId;
        }
        return false;
    }
    static public function DeleteBook($newName)
    {

        $sql = "DELETE FROM Books WHERE name = '$newName'";
        $result = self::$connection->query($sql);
        if ($result === true) {
            $newBookId = "usuniete";
            return $newBookId;
        }
        return false;
    }
    static public function UpdateBook($id, $newName, $newAuthor, $newDescription)
    {
        $sql = "UPDATE Books SET
            name ='$newName',
            author ='$newAuthor',
            description = '$newDescription'
            WHERE name ='$id'";

        $result = self::$connection->query($sql);
        if ($result === true) {
            return "update";
        }
        return false;
    }

    private $id;
    private $name;
    private $author;
    private $description;

    public function __construct()
    {
        $this->id = -1;
        $this->name = "";
        $this->author = "";
        $this->description = "";
    }

    public function setId($id)
    {
        $this->id = $id;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public function setAuthor($author)
    {
        $this->author = $author;
    }
    public function setDescription($description)
    {
        $this->description = $description;
    }
    public function getName()
    {
        return $this->name;
    }
    public function getAuthor()
    {
        return $this->author;
    }
    public function getDescription()
    {
        return $this->description;
    }

}