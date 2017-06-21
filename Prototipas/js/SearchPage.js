$(document).ready(function () {
    init();

    $("#searchButton").on("click", function () {
        var searchText = $("#searchBar").val().trim();
        if (searchText != "") {
            localStorage.setItem('search-argument', searchText);
            window.open('search.html', '_self');
        }

    })

    $('#searchBar').keypress(function (e) {
        if (e.which == 13) {
            var searchText = $("#searchBar").val().trim();
            if (searchText != "") {
                localStorage.setItem('search-argument', searchText);
                window.open('search.html', '_self');
            }
        }
    });
    $(".list-group-item").hover(function () {
        this
    });
});

function init() {
    var keyword = localStorage.getItem('search-argument');
    if (keyword) {
        this.keyword = keyword;
        $(".loadingStuff").css("visibility", "initial");
        localStorage.removeItem('search-argument');
        $("#searchBar").val(keyword);
        callToServer(keyword);
    }
}

function test(e) {
    localStorage.setItem('game-id', e);
    window.open('itemPage.html', '_self');
};

function compare(a, b) {
    if (a.original_release_date > b.original_release_date || (b.original_release_date == null && a.original_release_date != null)) {
        return -1;
    }
    if (a.original_release_date < b.original_release_date) {
        return 1;
    }
    return 0;
}

function AppendCallback(data) {
    results = results.concat(data.results);
    if (index * 10 < data.number_of_total_results) {
        index++;
        AppendMissingResults();
    }
    else {
        results.sort(compare);
        var x = 0;
        results.forEach(function (item) {
            x++;
            if (x <= 20) {
                var a = document.createElement("a");
                var gameID = item.id;
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

                if (item.image != null) {
                    aDivMediaFigureImg.src = item.image.small_url;
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
                aDivContentHeading.innerHTML = item.name;
                var aDivContentDescription = document.createElement("p");
                aDivContentDescription.className = "list-group-item-text";
                aDivContentDescription.innerHTML = item.deck; /*iem.deck*/

                aDivContent.appendChild(aDivContentHeading);
                aDivContent.appendChild(aDivContentDescription);
                a.appendChild(aDivContent);
                searchResultsHolder.appendChild(a);
            }
        
    });
    }
}

function AppendMissingResults() {
    $.ajax({
        url: 'http://www.giantbomb.com/api/search/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&query="' + keyword + '"&resources=game&page=' + index,
        type: "get",
        data: { json_callback: "AppendCallback" },
        dataType: "jsonp"
    });
}

var keyword;
var results = [];
var resultsLeft;
var index = 2;

function serverCallback(data) {
    console.log(data);
    var searchResultsHolder = document.getElementById("searchResultsHolder");

    results = results.concat(data.results);
    resultsLeft = data.number_of_total_results;

    if (data.number_of_total_results > 10) {
        
        AppendMissingResults();
    }
    else {
        results.sort(compare);
        results.forEach(function (item) {
            
            var a = document.createElement("a");
            var gameID = item.id;
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

            if (item.image != null) {
                aDivMediaFigureImg.src = item.image.small_url;
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
            aDivContentHeading.innerHTML = item.name;
            var aDivContentDescription = document.createElement("p");
            aDivContentDescription.className = "list-group-item-text";
            aDivContentDescription.innerHTML = item.deck; 

            aDivContent.appendChild(aDivContentHeading);
            aDivContent.appendChild(aDivContentDescription);
            a.appendChild(aDivContent);
            searchResultsHolder.appendChild(a);
        });
    }

    $(window).on("load", function () {
        $(".media-object").css('height', $(".list-group-item").innerHeight() - ($(".list-group-item").outerHeight() - $(".list-group-item").height()));
        $(".loadingStuff").css("display", "none");
        $(".search-rows").css("visibility", "initial");
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

function callToServer(keyword) {
	console.log(keyword);
	var u = 'http://www.giantbomb.com/api/search/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&query="' + keyword + '"&resources=game';
	console.log(u);
    $.ajax({
        url: u,
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
}




