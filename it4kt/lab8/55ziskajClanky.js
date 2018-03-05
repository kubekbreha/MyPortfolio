/**
 * Created by stefan.kr
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu

//Počet naraz zobrazených článkov
var pocetClankovNaStranu = 2;

//Doménové meno servera s databázou článkov
var server = "wt.kpi.fei.tuke.sk";


//Výpis prvých článkov a vytvorenie navigačného panela
forwardArticles2Html(-2, pocetClankovNaStranu, server, 'clanky', 'navigacia');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie


/**
 * Vráti HTML kód pre navigačnú časť stránky
 * @param startIndex - index prvého zo zobrazených článkov
 * @param articlesCount - počet vypísaných článkov
 * @param articlesTotalCount  - celkový počet článkov v databáze servra
 * @returns {string} - HTML kód pre navigačnú časť stránky
 */

function navHtml(startIndex, articlesCount, articlesTotalCount) {
    var htmlKod = "";

    if (articlesCount > 0) {
        htmlKod += "Vypisujem články " + (startIndex + 1) + " až " + (startIndex + articlesCount) + " z " + articlesTotalCount;

    }
    htmlKod += "</br>";


    htmlKod += " <button onclick=\"backwardArticles2Html(" + startIndex + ", pocetClankovNaStranu, server, 'clanky', 'navigacia')\">" +
        "Load Back</button>";


    htmlKod += " <button onclick=\"forwardArticles2Html(" + startIndex + ", pocetClankovNaStranu, server, 'clanky', 'navigacia')\">" +
        "Load Next</button>";
    return htmlKod;
}


/**
 * Vráti HTML kód so zoznamom článkov, získaného z objektu articles
 * @param articles  - JSON objekt s článkami
 * @returns {string} - HTML kód pre časť stránky s článkami
 */
function articlesHtml(articles) {
    var count;
    var htmlKod = "";
    if (count = articles.articles.length) { //ak su nejake clanky
        for (var i = 0; i < count; i++)
            htmlKod += "<p>" +  articles.articles[i].author + ": " + articles.articles[i].title + "(" + articles.articles[i].lastUpdated + ")" + " </p>";
    }
    return htmlKod;
}


/**
 * Zapíše autorov a názvy článkov do daného html elementu
 * @param articles  - JSON objekt s článkami
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 */
function JSON2Html(articles, articlesElmId, navElmId, startIndex, max) {
    var articlesElm = document.getElementById(articlesElmId);
    var navElm = document.getElementById(navElmId);
    if (articlesElm && navElm) {
        articlesElm.innerHTML = articlesHtml(articles);
        navElm.innerHTML = navHtml(startIndex, articles.articles.length, articles.meta.totalCount);
    }
}


/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 */
function errorDialog(status) {
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= " + status);
}


/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate. Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe. Jej parametrom by malo byt cislo so statusom odpovede
 */
function getJSONAllBr(url, successHandler, errorHandler) {


    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () { //alternativne mozem pouzit xhr.addEventListener("readystatechange",funkcia, false),
        // ale tu je pouzita anonymna funkcia a bolo by to iba neprehladnejsie
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE, alternativne sa da pouzit XMLHttpRequest.DONE
            status = xhr.status;
            if (status === 200) { //uspesne vybavena poziadavka
                data = JSON.parse(xhr.responseText);


                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};


/**
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 * @param server - doménové meno servera odkiaľ sa majú údaje stiahnuť.
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 */
function forwardArticles2Html(startIndex, max, server, articlesElmId, navElmId) {
    startIndex += 2;
    var restURL = "http://" + server + "/api/article/?max=" + max + "&offset=" + startIndex;
    console.log(restURL);
    getJSONAllBr(restURL,
        function (JSONObj) {
            JSON2Html(JSONObj, articlesElmId, navElmId, startIndex, max)
        },
        function (status) {
            errorDialog(status)
        });
}



function backwardArticles2Html(startIndex, max, server, articlesElmId, navElmId) {
    if (startIndex !== 0) {
        startIndex -= 2;
    }
    var restURL = "http://" + server + "/api/article/?max=" + max + "&offset=" + startIndex;
    console.log(restURL);
    getJSONAllBr(restURL,
        function (JSONObj) {
            JSON2Html(JSONObj, articlesElmId, navElmId, startIndex, max)
        },
        function (status) {
            errorDialog(status)
        });
}
