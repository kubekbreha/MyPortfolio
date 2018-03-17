var $form = $("#commentForm");
var artId = queryString2obj().id;


if (isFinite(artId)){
    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article/"+artId+"/comment",
        dataType: "json",
        success: function (comment) {
            $("#author").val(comment.author);
            $("#text").val(comment.text);
            $("#frmTitle").html("Uprav komentár");
        },
        error:function(jxhr){
            console.log("Načítanie komentáru na editáciu neúspešné.\nChyba: "+ jxhr.status + " (" + jxhr.statusText + ")");
        }
    });
}else{
    $("#frmTitle").html("Pridaj komentár");
}

//Pridanie funkcionality pre kliknutie na tlacidlo "Ulož článok"
$form.submit(function(event){  //tu potrebujem aj objekt s udalosťou, aby som
    event.preventDefault(); //zrušiť pôvodné spracovanie udalosti
    if (control == 0) {
        prepareAndSendComment($form,"POST","http://"+server+"/api/article/"+artId+"/comment");
    }else{
        prepareAndSendComment($form,"PUT","http://"+server+"/api/comment/"+comId);
    }
    control=0;
});

var comId;
var control=0;
function updateCom(id){
    $("form").toggle();
    comId=id;
    control=1;
    if (isFinite(id)){
        $.ajax({
            type: 'GET',
            url: "http://"+server+"/api/comment/"+id,
            dataType: "json",
            success: function (comment) {
                $("#author").val(comment.author);
                $("#text").val(comment.text);
                $("#frmTitle").html("Uprav komentár");
            },
            error:function(jxhr){
                console.log("Načítanie komentára na editáciu neúspešné.\nChyba: "+ jxhr.status + " (" + jxhr.statusText + ")");
            }
        });
    }else{
        $("#frmTitle").html("Pridaj komentár");
    }
}

/**
 * Spracuje údaje o článku z formulára a odošle na uloženie na server
 * @param $frm - formulár s článkom (jQuery objekt)
 * @param method - metóda, "POST" (pridanie článku) alebo "PUT" (úprava článku)
 * @param restURL - url zdroja na serveri
 */
function prepareAndSendComment($frm, method, restURL) {


    //1. Uloží údaje z formulára do objektu
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){//ak je hodnota neprázdny reťazec
                data[item.name] = item.value;
            }
        }
    );


    console.log("prepareAndSendComment> Údaje po uložení z formulára do objektu:");
    console.log(JSON.stringify(data));

    //3.Kontrola, či boli zadané povinné polia
    if(!data.author){ //toto len pre istotu
        alert("Autor komentára musí byť zadaný a musí obsahovať čitateľné znaky");
        return;
    }
    if(!data.text){ //toto je dôležité, keďže na textarea sa nedá použiť pattern. Odchytí, keď používateľ do prvku content
        //zadal iba biele znaky
        alert("Text komentára musí byť zadaný a musí obsahovať čitateľné znaky.");
        return;
    }

    console.log("prepareAndSendComment> Povinné údaje úspešne skontrolované:");


    //4. odoslanie údajov
    if(window.confirm("Skutočne si želáte komentár zapísať do databázy?")){

        $.ajax({
            type: method,
            url: restURL,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data:JSON.stringify(data),
            success: function (response) {
                if(response.id){
                    console.log(response.id);
                    window.location.href="article.html?id="+artId;
                }
            },
            error: function (jxhr) {
                window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}
