var $form = $("#SKorFrm");
var artId = queryString2obj().id;


if (isFinite(artId)){
    console.log("edit article "+artId);

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
                $("#frmTitle").html("Edit article");
        },
        error:function(jxhr){
            window.alert("Loading article for edit failed.\nError: "+ jxhr.status + " (" + jxhr.statusText + ")");
        }
    });
}else{
    $("#frmTitle").html("Add article");
}

//go back button
$("#btBack").click(function(){
    window.history.back()
});

//commit article button
$form.submit(function(event){
    event.preventDefault();
    if (isFinite(artId)) {
        prepareAndSendArticle($form,"PUT","http://"+server+"/api/article/"+artId);
    }else{
        prepareAndSendArticle($form,"POST","http://"+server+"/api/article");
    }

});

//load image stuff.
$("#btShowFileUpload").click(function(){
    $('#fsetFileUpload').removeClass("skryty");
    $('#btShowFileUpload').addClass("skryty");

});


//Send to server button
$("#btFileUpload").click(function(){
    uploadImg(
        $('#imageLink'),
        $('#fsetFileUpload'),
        $('#btShowFileUpload'),
        document.getElementById('flElm').files
    );
});

//stop loading
$("#btCancelFileUpload").click(function(){
    $('#fsetFileUpload').addClass("skryty");
    $('#btShowFileUpload').removeClass("skryty");
});

window.onload = function() {
    setFirstFormElement()
};

//set user name from firebase to author form
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
            // window.location.href = "login.html";
        }
    });
}



/**
 * Proess data from form and send them to server.
 * @param $frm - form (jQuery objekt)
 * @param method - metóda, "POST" (add article) or "PUT" (edit article)
 * @param restURL - url of source on server
 */
function prepareAndSendArticle($frm, method, restURL) {
    //1. save data from form to object
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){
                data[item.name] = item.value;
            }
        }
    );


    console.log("prepareAndSendArticle> data after saving into object:");
    console.log(JSON.stringify(data));

    if(data.tags){
        data.tags=data.tags.split(",");
        data.tags=data.tags.map(function(tag) {return tag.trim()});
    }

    console.log("prepareAndSendArticle> tags after processing:");
    console.log(JSON.stringify(data));

    //3.Check if needed forms was filled
    if(!data.title){
        Materialize.toast('Article name must be filled', 4000);
        // alert("Article name must be filled");
        return;
    }
    if(!data.content){
        Materialize.toast('Text of article must be filled', 4000);
        //alert("Text of article must be filled");
        return;
    }

    console.log("prepareAndSendArticle> All needed forms filled:");


    //4. sending data
    if(window.confirm("You really want to save this project")){

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
                Materialize.toast("Processing failed. Data was not saved. Error code:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText, 4000);
                //window.alert("Processing failed. Data was not saved. Error code:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });

    }
}


function uploadImg($imgLinkElement,$fieldsetElement, $btShowFileUploadElement, files) {
    if (files.length>0){
        var imgData = new FormData();
        imgData.append("file", files[0]);
        console.log("upload working");
        $.ajax({
            type: "POST",
            url: "http://"+server+"/api/fileUpload",
            dataType: "json",
            processData: false,
            contentType: false,
            data:imgData,
            success: function (response) {
                if(response.fullFileUrl){
                    $imgLinkElement.val(response.fullFileUrl);
                    $btShowFileUploadElement.removeClass("skryty");
                    $fieldsetElement.addClass("skryty");
                }
            },
            error: function (jxhr) {
                Materialize.toast("Processing failed. Picture was not saved. Error code:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText, 4000);
                //window.alert("Processing failed. Picture was not saved. Error code:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });
    }else{
        Materialize.toast("Pick picture file", 4000);
        window.alert("Pick picture file");
    }
}
