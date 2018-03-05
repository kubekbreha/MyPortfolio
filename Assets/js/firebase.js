var articleText = document.getElementById("article_text");
var submitButton = document.getElementById("submit");

function submitClick() {
   var firebaseRef = firebase.database().ref();

   firebaseRef.child("Article").set("first firebase article");
    
}