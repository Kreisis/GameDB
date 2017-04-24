$(document).ready(function () {
    init();
});

function init() {
    var array = JSON.parse(localStorage.getItem('HistoryArray'));
    console.log(array);
    array.forEach(function (item) {
        callToServer(item);
    });

}

function test(e) {
    localStorage.setItem('game-id', e);
    window.open('itemPage.html', '_self');
};

function serverCallback(data) {

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

    if (data.results.image != null) {
        aDivMediaFigureImg.src = data.results.image.small_url;
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
    aDivContentHeading.innerHTML = data.results.name;
    var aDivContentDescription = document.createElement("p");
    aDivContentDescription.className = "list-group-item-text";
    aDivContentDescription.innerHTML = data.results.deck;

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
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id,deck,name",
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
}




