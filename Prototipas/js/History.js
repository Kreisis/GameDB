$(document).ready(function () {
    init();
});


var gameDetailsArray = [];
var promiseArray = [];
var array = [];
function init() {
    array = JSON.parse(localStorage.getItem('HistoryArray'));
    
    array.forEach(function (item) {
        callToServer(item);
    });

    /*$.when.apply($, promiseArray).then(test, function (e) {
        console.log(e);
        console.log(gameDetailsArray);
    });*/

    /*$.when(promiseArray[0], promiseArray[1], promiseArray[2]).then(test2);*/
    $.when.apply($, promiseArray).then(test2);


}
function test2() {
    console.log(array);
    /*var finalGameDetailsArray = SortBygameId(array).reverse();
    console.log(gameDetailsArray);
    console.log(finalGameDetailsArray);*/


    
    finalGameDetailsArray.forEach(function (item) {
        appendHTML(item);
    });
    
}

function SortBygameId(idArray) {
    return _.sortBy(gameDetailsArray, function (x) {
        return _.indexOf(idArray, x.id);
    })
    
}

function test(e) {
    localStorage.setItem('game-id', e);
    window.open('itemPage.html', '_self');
};

function appendHTML(data) {
    var a = document.createElement("a");
    var gameID = data.id;
    a.onclick = function (gameId) {
        test(gameID);
    };

    a.className = "list-group-item";
    var aDivMedia = document.createElement("div");
    aDivMedia.className = "media col-md-3";
    var aDivMediaFigure = document.createElement("figure");
    aDivMediaFigure.className = "pull-left";
    var aDivMediaFigureImg = document.createElement("img");
    aDivMediaFigureImg.className = "media-object img-rounded img-responsive";

    if (data.image != null) {
        aDivMediaFigureImg.src = data.image.small_url;
    }
    else {
        aDivMediaFigureImg.src = "http://liutenas.lt/images/portfolio/no-image-found.jpg";
    }



    aDivMediaFigure.appendChild(aDivMediaFigureImg);
    aDivMedia.appendChild(aDivMediaFigure);
    a.appendChild(aDivMedia);

    var aDivContent = document.createElement("div");
    aDivContent.className = "col-md-9";
    var aDivContentHeading = document.createElement("h1");
    aDivContentHeading.className = "content-header";
    aDivContentHeading.innerHTML = data.name;
    var aDivContentDescription = document.createElement("p");
    aDivContentDescription.className = "list-group-item-text";
    aDivContentDescription.innerHTML = data.deck;

    aDivContent.appendChild(aDivContentHeading);
    aDivContent.appendChild(aDivContentDescription);
    a.appendChild(aDivContent);
    searchResultsHolder.appendChild(a);

    $(window).on("load", function () {
        $(".media-object").css('height', $(".list-group-item").innerHeight() - ($(".list-group-item").outerHeight() - $(".list-group-item").height()));
        $(".loadingStuff").css("display", "none");
        $(".search-rows").css("visibility", "initial");
        $(".list-group-item").css('border-radius', 0);
    });
}

function serverCallback(data) {

    gameDetailsArray.push(data.results);
    
    /*
    <a href="#" class="list-group-item active">
            <div class="media col-md-3">
                <figure class="pull-left">
                    <img class="media-object img-rounded img-responsive" src="http://placehold.it/350x250" alt="placehold.it/350x250">
                </figure>
            </div>
            <div class="col-md-9">
                <h4 class="list-group-item-heading"> List group heading </h4>
                <p class="list-group-item-text">
                    Qui diam libris ei, vidisse incorrupte at mel. His euismod salutandi dissentiunt eu. Habeo offendit ea mea. Nostro blandit sea ea, viris timeam molestiae an has. At nisl platonem eum.
                    Vel et nonumy gubergren, ad has tota facilis probatus. Ea legere legimus tibique cum, sale tantas vim ea, eu vivendo expetendis vim. Voluptua vituperatoribus et mel, ius no elitr deserunt mediocrem. Mea facilisi torquatos ad.
                </p>
            </div>
        </a>
        */
}

function callToServer(gameId) {
    var dfd = jQuery.Deferred();
    promiseArray.push(dfd.promise());
    var promise = $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id,deck,name",
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    }).fail(function (data) {
        dfd.resolve();
    });
    /*
    var promise = $.get("http://cors-anywhere.herokuapp.com/" + "https://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=json&field_list=image,id,deck,name", function (data) {
        serverCallback(data);
    });*/

    
}




