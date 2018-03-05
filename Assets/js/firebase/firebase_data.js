var articleText = document.getElementById("article_text");
var submitButton = document.getElementById("submit");
var testHeading = document.getElementById("h1_test");

var firebaseHeadingRef = firebase.database().ref().child("Heading");

firebaseHeadingRef.on('value', function (datasnapshot) {
    testHeading.innerText = datasnapshot.val();
});

function submitClick() {
   var firebaseRef = firebase.database().ref();

   var articleTextString = articleText.value;

   firebaseRef.child("Articles").push().set(articleTextString);
}