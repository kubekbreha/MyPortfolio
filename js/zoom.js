var ClassNameCary = "zoom";

function zoomPage(ClassNameCary){
    var size = parseFloat(document.body.style.fontSize);
    if(size < "30"){
        document.body.style.fontSize = "30px";
        document.body.style.color = "red";
        var x = document.getElementsByClassName(ClassNameCary);
        var i;
        for(i = 0; i < x.length; i++){
            x[i].style.color = "blue";
        }
    }
    else {
        document.body.style.fontSize = "20px";
        document.body.style.color = "black";
        var x = document.getElementsByClassName(ClassNameCary);
        var i;
        for(i = 0; i < x.length; i++){
            x[i].style.color = "black";
        }
    }
}