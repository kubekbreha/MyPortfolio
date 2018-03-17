$(document).ready(function(){
    $('#searchform').submit(function(){
        var query = '';

        var tag = $('input[name="search"]').val();

        if(tag != ''){query += (query == '' ? '?' : '&') + 'tag=' + tag;}

        if(query == ''){
            writeArticles2Html(starter, pocetClankovNaStranu, server, 'clanky', 'navigacia');
        }else{
            foundArticles('clanky', 'navigacia', query);
            /*
            var restURL="http://"+server+"/api/article"+query;
            console.log(restURL);
            getJSONAllBr(restURL, function(JSONObj){rendering(JSONObj, 'clanky', 'navigacia')}, function(status){errorDialog(status)});*/
        }
    });
});

function foundArticles(articleElmId, navElmId, query){
    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article"+query,
        dataType: "json",
        success: function (article) {
            article.dateCreatedHr = moment(article.dateCreated).calendar();
            article.lastUpdatedHr = moment(article.lastUpdated).calendar();
            $("#"+articleElmId).html(Mustache.render($("#listOfArticlesMTemplate").html(), article));
            $("#"+navElmId).html("");
        },
        error:function(responseObj,textStatus, errorThrown){
            errorDialog(textStatus+"("+errorThrown+")");
        }
    });
}