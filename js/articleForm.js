////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Poznámky

/*
Ak by som chcel overiť validitu samostatne, zavolám na formulár alebo konkrétny prvok
checkValidity()
POZOR: toto síce overí validitu, ale bez klasických html výpisov
Viac o js funkcionalite pre HTML5 validáciu:

http://www.w3schools.com/js/js_validation_api.asp
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu

var $form = $("#SKorFrm");
var artId = queryString2obj().id;


if (isFinite(artId)){
    console.log("upravit clanok "+artId);

    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article/"+artId,
        dataType: "json",
        success: function (article) {
                $("#author").val(article.author);
                $("#title").val(article.title);
                $("#imageLink").val(article.imageLink);
                $("#content").val(article.content);
                $("#tags").val(article.tags);
                $("#frmTitle").html("Uprav článok");
        },
        error:function(jxhr){
            window.alert("Načítanie článku na editáciu neúspešné.\nChyba: "+ jxhr.status + " (" + jxhr.statusText + ")");
        }
    });
}else{
    $("#frmTitle").html("Pridaj článok");
}



//Pridanie funkcionality pre kliknutie na tlacidlo "Späť"
$("#btBack").click(function(){
    window.history.back()
});

//Pridanie funkcionality pre kliknutie na tlacidlo "Ulož článok"
$form.submit(function(event){  //tu potrebujem aj objekt s udalosťou, aby som
    event.preventDefault(); //zrušiť pôvodné spracovanie udalosti
    if (isFinite(artId)) {
        prepareAndSendArticle($form,"PUT","http://"+server+"/api/article/"+artId);
    }else{
        prepareAndSendArticle($form,"POST","http://"+server+"/api/article");
    }

});

//Pridanie funkcionality pre kliknutie na tlacidlo "Nahraj obrázok"
$("#btShowFileUpload").click(function(){
    $('#fsetFileUpload').removeClass("skryty");
    $('#btShowFileUpload').addClass("skryty");

});


//Pridanie funkcionality pre kliknutie na tlacidlo "Odošli obrázok na server"
$("#btFileUpload").click(function(){
    uploadImg(
        $('#imageLink'),
        $('#fsetFileUpload'),
        $('#btShowFileUpload'),
        document.getElementById('flElm').files //stary sposob, jQuery verzia nema files
    );
});

//Pridanie funkcionality pre kliknutie na tlacidlo "Zruš nahrávanie"
$("#btCancelFileUpload").click(function(){
    $('#fsetFileUpload').addClass("skryty");
    $('#btShowFileUpload').removeClass("skryty");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie











window.onload = function() {
    setFirstFormElement()
};

function setFirstFormElement() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var uid = user.uid;
            console.log(user.uid);

            var userName = "";

            var database = firebase.database();
            var refUser = database.ref('users').child(uid).child("userInfo");
            refUser.once("value", function (snapshot) {
                snapshot.forEach(function (child) {
                    if (child.key === "userName") {
                        console.log(child.key + ": " + child.val());
                        userName = child.val();
                        document.getElementById("author").value = userName;
                        console.log("username from form:  " + userName);
                    }
                });
            });
        } else {
            window.location.href = "login.html";
        }
    });
}







/**
 * Spracuje údaje o článku z formulára a odošle na uloženie na server
 * @param $frm - formulár s článkom (jQuery objekt)
 * @param method - metóda, "POST" (pridanie článku) alebo "PUT" (úprava článku)
 * @param restURL - url zdroja na serveri
 */
function prepareAndSendArticle($frm, method, restURL) {
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


    console.log("prepareAndSendArticle> Údaje po uložení z formulára do objektu:");
    console.log(JSON.stringify(data));

    //2.Upraví údaje vo form2trimmedStringsObject do podoby vhodnej na odoslanie
    if(data.tags){ //ak existuje položka tags a nie je to prázdny reťazec
                   //ak chcem len vedieť, či data má položku tags, ideálne je volať
                   //Object.prototype.hasOwnProperty.call(data, 'tags')
                   //viď. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        data.tags=data.tags.split(","); //zmeni retazec na pole. Oddelovac poloziek je ciarka.
        data.tags=data.tags.map(function(tag) {return tag.trim()}); //odstráni prázdne znaky na začiatku a konci každého kľúčového slova
    }

    console.log("prepareAndSendArticle> Údaje po úprave tags na pole:");
    console.log(JSON.stringify(data));

    //3.Kontrola, či boli zadané povinné polia
    if(!data.title){ //toto len pre istotu
        alert("Názov článku musí byť zadaný a musí obsahovať čitateľné znaky");
        return;
    }
    if(!data.content){ //toto je dôležité, keďže na textarea sa nedá použiť pattern. Odchytí, keď používateľ do prvku content
                       //zadal iba biele znaky
        alert("Obsah článku musí byť zadaný a musí obsahovať čitateľné znaky.");
        return;
    }

    console.log("prepareAndSendArticle> Povinné údaje úspešne skontrolované:");


    //4. odoslanie údajov
    if(window.confirm("Skutočne si želáte článok zapísať do databázy?")){

        $.ajax({
            type: method,
            url: restURL,
            dataType: "json",
            contentType:"application/json;charset=UTF-8",
            data:JSON.stringify(data),
            success: function (response) {
                if(response.id){
                    console.log(response.id);
                    window.location.href="article.html?id="+response.id;
                }
            },
            error: function (jxhr) {
                window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}


function uploadImg($imgLinkElement,$fieldsetElement, $btShowFileUploadElement, files) {
    if (files.length>0){
        var imgData = new FormData();
        imgData.append("file", files[0]); //beriem len prvy obrazok, ved prvok formulara by mal povolit len jeden
        console.log("ide upload");
        //pozor:nezadavat content-type. potom to nepojde.
        $.ajax({
            type: "POST",
            url: "http://"+server+"/api/fileUpload",
            dataType: "json",
            processData: false, //toto musim dat, aby sa jQuery nesnazil udaje spracovavat. inak vyvola  “Uncaught TypeError: Illegal invocation”
            contentType: false, //toto musim dat, aby server poziadavku spracoval
            data:imgData,
            success: function (response) {
                if(response.fullFileUrl){
                    $imgLinkElement.val(response.fullFileUrl);
                    $btShowFileUploadElement.removeClass("skryty");
                    $fieldsetElement.addClass("skryty");
                }
            },
            error: function (jxhr) {
                window.alert("Spracovanie neúspešné. Obrázok nebol uložený na serveri. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });
    }else{
        window.alert("Vyberte súbor s obrázkom");
    }
}
