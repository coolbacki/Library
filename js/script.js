$(function () {

    var showItem = "";


   /*
    * chciałem użyć jednej funkcji która załaduje się automatycznie na początku ale będę mógł ją dodatkowo wywołać
    * dodając parametr. Tj. na początku wyświetl wszystkie, a później po dodaniu kolejnej ksiazki wyświetlam
    * tylko jedna ksiazke
    *
    * Niestety nie udało mi się znaleźć jak to zrobić, więc pierwsze załadowanie jest po kliknięciu
    *
    * kod zawiera dużo console.log - na bieżąco obserwuję kod
    *
    * */

    $('#show').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();


    // wyświetl książki / książkę
        $.ajax({
            url: 'api/apiBooks.php',
            data: showItem,
            type: "GET",
            dataType: "json",
            success: function (result) {
                var mainDiv = $('.showBooks');


       /*
        * pętla for była polecana bo szybsza - natomiast jak próbowałem dodać "i" w miejsce id to nie
        * (tak żeby dodać do diva book id z bazy)
        * roboczo dodałem w miejsce id name z bazy
        *
        */

                for (var i = 0; i < result.length; i++) {



        //nie działało prepend - nie wstawiało poprawnie bloków. Musiałem zastosować prependTo

                    var divBook = $('<div>').addClass('book panel panel-primary').prependTo(mainDiv);
                    var row = (result[i]);
                    var panelHeading = $('<div>').addClass('panel-heading').appendTo(divBook);
                    var name = $('<a>').addClass('name').html(row.name).appendTo(panelHeading);
                    var divEdit = $('<div>').addClass('pull-right').appendTo(panelHeading);
                    var aEdit = $('<a>').attr('id', row.name).addClass('edit glyphicon glyphicon-edit').appendTo(divEdit);
                    var space = $('<a>').html(" | ").appendTo(divEdit);
                    var aRemove = $('<a>').addClass('remove glyphicon glyphicon-remove').appendTo(divEdit);


        // poprawie poniższe wg powyższego wzroru jak wszystko będzie dobrze działać

                    divBook.append($('<div>').addClass('panel-body small').html('Autor: <i class="author">' + row.author + '</i><a class="more glyphicon glyphicon-chevron-left pull-right"></a>').css('color', 'gray'));
                    divBook.append($('<div>').addClass('panel-footer small').html('<b>Opis:</b> <i class="description">' + row.description + '</i>').css('display', 'none'));
                }




       /*
        *  nie wiem / nie rozumiem dlaczego poniższe funkcje muszą być w ciele ajax GET -> success
        *  umieszczając je poza tym miejscem funkcje nie działają
        *  musiałem tu wrzucić wszystkie poniższe funkcje
        *
        */



        // wyświetl opis (funkcja nie działa poprawnie po dodaniu kolejnej książki)
                $('.more').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if ($(this).hasClass('glyphicon-chevron-left')) {

                        $(this).removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-down');
                        $(this).closest(".panel-body").next().slideDown();
                    } else {
                        $(this).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-left');
                        $(this).closest(".panel-body").next().slideUp();

                    }

                });


        // edytuj książkę
                $('.edit').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();


                    if ($(this).hasClass('glyphicon-edit')) {

            // włącz tryb edycji (zamień pola na inputy)
                        $(this).removeClass('glyphicon-edit').addClass('glyphicon-ok');
                        var toEditName = $(this).parent().prev().html();
                        var toEditAuthor = $(this).parent().parent().next().children().html();
                        var toEditDescription = $(this).parent().parent().next().next().children('i').html();
                        console.log(toEditName);
                        console.log(toEditAuthor);
                        console.log(toEditDescription);
                        $(this).parent().prev().html("<input type='text' name='newName' class='small' style='color: grey' value='" + toEditName + "'>");
                        $(this).parent().parent().next().children("i").html("<input type='text' name='newAuthor' class='small' style='color: grey' value='" + toEditAuthor + "'>");
                        $(this).parent().parent().next().next().children('i').html("<input type='text' name='newDescreption' class='small' style='color: grey' value='" + toEditDescription + "'>");
                    } else {

            // zapisz zedytowane pola (wyślij inputy) + zaktualizuj na stronie
                        $(this).removeClass('glyphicon-ok').addClass('glyphicon-edit');

                        var newName = $(this).parent().prev().children().val();
                        console.log(newName);
                        var newAuthor = $(this).parent().parent().next().children("i").children().val();
                        console.log(newAuthor);
                        var newDescription = $(this).parent().parent().next().next().children('i').children().val();
                        console.log(newDescription);
                        var id = $(this).attr('id');
                        console.log(id);


            // nie rozumiem dlaczego zmiany na stronie muszę wprowadzić przed ajaxem (w success nie dzialało)
                        var toUpdate = {id: id, newName: newName, newAuthor: newAuthor, newDescription: newDescription};
                        console.log(toUpdate);
                        $(this).parent().prev().html(newName);
                        $(this).parent().parent().next().children("i").html(newAuthor);
                        $(this).parent().parent().next().next().children('i').html(newDescription);

                        $.ajax({
                            url: 'api/apiBooks.php',
                            data: toUpdate,
                            type: "UPDATE",
                            dataType: "json",
                            success: function (result) {
                                console.log(result);
                                console.log('udany update');

                            },
                            error: function (xhr, status, errorThrown) {
                                console.log('wystapil error update');
                                console.log(xhr);
                                console.log(status);
                                console.log(errorThrown);
                            },
                            complete: function (xhr, status) {
                                console.log('zakonczono update');
                                console.log(xhr);
                                console.log(status);
                            }
                        });


                    }

                });



            // usuń rekord z bazy i ze strony
                $('.remove').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();

                    console.log('removeclick');
                    console.log($(this).parents('div.book'));


                    var toDelete = $.trim($(this).parent('div').prev().html());
                    console.log(toDelete);


            // nie rozumiem dlaczego kasowanie ze strony muszę zrobić przed ajaxem - jak było w succes to nie działało
                    $(this).parents('div.book').remove();

                    $.ajax({
                        url: 'api/apiBooks.php',
                        data: {name: toDelete},
                        type: "DELETE",
                        dataType: "json",
                        success: function (result) {
                            console.log(result);
                            console.log('udane delete');

                        },
                        error: function (xhr, status, errorThrown) {
                            console.log('wystapil error delete');
                            console.log(xhr);
                            console.log(status);
                            console.log(errorThrown);
                        },
                        complete: function (xhr, status) {
                            console.log('zakonczono delete');
                            console.log(xhr);
                            console.log(status);
                        }
                    });


                });


            },
            error: function (xhr, status, errorThrown) {
                console.log('wystapil error get');
                console.log(xhr);
                console.log(status);
                console.log(errorThrown);
            },
            complete: function (xhr, status) {
                console.log('zakonczono get');
                console.log(xhr);
                console.log(status);
            }
        });

    });

// dodaj do bazy POST - w success wywołaj funkcję GET z paramentrem ID
    $('#submit').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $.ajax({
            url: 'api/apiBooks.php',
            data: $("#CreateBook").serialize(),
            type: "POST",
            dataType: "json",
            success: function (result) {
                console.log(result);
                console.log('udalo sie post');
                showItem = {id: result};
                $('#show').click();
                $("input[type=text]").val('');
                $("textarea").val('');

            },
            error: function (xhr, status, errorThrown) {
                console.log('wystapil error post');
                console.log(xhr);
                console.log(status);
                console.log(errorThrown);
            },
            complete: function (xhr, status) {
                console.log('zakonczono post');
                console.log(xhr);
                console.log(status);
            }
        });
    });


});