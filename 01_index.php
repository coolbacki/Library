<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="js/script.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style/style.css">
</head>
<body>
<?php require_once("./src/connection.php"); ?>
<a id="show">show</a>
<table align="center">
    <tr>
    <!-- formularz wprowadzenia ksiazki -->
        <td valign="top" width="421">
            <div class="panel panel-primary">
                <p class="panel-heading">Dodaj ksiazke</p>
                <form method="post" id="CreateBook" class="panel-body">
                    <label><input type='text' name='name' class="form-control" placeholder="Tytul"></label>
                    <label><input type='text' name='author' class="form-control" placeholder="Autor"></label>
                    <label><textarea type='text' rows="3" name='description' cols="44" class="form-control"
                                     placeholder="Opis ksiazki"></textarea></label>
                    <input type='submit' id="submit" class="btn btn-danger">
                </form>
            </div>
        </td>
    <!-- odstęp między formularzem a listą książek-->
        <td width="20"></td>
    <!-- lista książek -->
        <td valign="top" width="500">
            <div class="showBooks">
            </div>
        </td>
    </tr>
</table>
<?php


?>

</body>
</html>