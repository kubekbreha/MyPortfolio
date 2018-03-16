/**
 * Zobrazí vyskakovacie okno s chybovým hlásením
 * @param message - text chybovej správy, ktorý sa má vypísať prvý
 * @param xhrObj - objekt xhttp požiadavky (typ XMLHttpRequest alebo jqXHR)
 */
function errorAlert(message,xhrObj){
    window.alert(message+"\nChyba: "+ xhrObj.status + " (" + xhrObj.statusText + ")");
}
