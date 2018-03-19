var $form = $("#commentForm");
var artId = queryString2obj().id;

window.onload = function() {
    setFirstFormElement()
};


if (isFinite(artId)){
    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article/"+artId+"/comment",
        dataType: "json",
        success: function (comment) {
            $("#author").val(comment.author);
            $("#text").val(comment.text);
            $("#frmTitle").html("Edit comment");
        },
        error:function(jxhr){
            Materialize.toast("Comment cant be loaded for editing.\nError: "+ jxhr.status + " (" + jxhr.statusText + ")", 4000);
            console.log("Comment cant be loaded for editing.\nError: "+ jxhr.status + " (" + jxhr.statusText + ")");
        }
    });
}else{
    $("#frmTitle").html("Add comment");
}

$form.submit(function(event){
    event.preventDefault();
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
                $("#frmTitle").html("Edit comment");
            },
            error:function(jxhr){
                Materialize.toast("Comment cant be loaded for editing.\nError: "+ jxhr.status + " (" + jxhr.statusText + ")", 4000);
                console.log("Comment cant be loaded for editing.\nError: "+ jxhr.status + " (" + jxhr.statusText + ")");
            }
        });
    }else{
        $("#frmTitle").html("Add comment");
    }
}

function prepareAndSendComment($frm, method, restURL) {

    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){
                data[item.name] = item.value;
            }
        }
    );


    console.log("prepareAndSendComment> Data after converting to object:");
    console.log(JSON.stringify(data));

    if(!data.author){ //toto len pre istotu
        Materialize.toast('Autor field cant be empty', 4000);
        // alert("Autor field cant be empty");
        return;
    }
    if(!data.text){
        Materialize.toast('Text of comment must be added', 4000);
        //alert("Text of comment must be added");
        return;
    }

    console.log("prepareAndSendComment> Must fill field checked:");




    if(window.confirm("Do you really wat to save this comment")){
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
                Materialize.toast("Processing error. Data wasn saved. Errorcode:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText, 4000);
                //window.alert("Processing error. Data wasn saved. Errorcode:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
            }
        });
    }
}


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
            window.location.href = "login.html";
        }
    });
}