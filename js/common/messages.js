/**
 * Show alert window with eror.
 * @param message test of the error.
 * @param xhrObj - object xhttp of request (XMLHttpRequest or jqXHR)
 */
function errorAlert(message,xhrObj){
    window.alert(message+"\nError: "+ xhrObj.status + " (" + xhrObj.statusText + ")");
}
