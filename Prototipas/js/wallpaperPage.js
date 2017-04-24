$(document).ready(function () {
    init();

    $("#searchButton").on("click", function () {
        var searchText = $("#searchBar").val().trim();
        var words = searchText.split(" ");
        searchText = words.join("+");
        if (searchText != "") {
            searchCall(searchText);
        }

    })

    $('#searchBar').keypress(function (e) {
        if (e.which == 13) {
            var searchText = $("#searchBar").val().trim();
            var words = searchText.split(" ");
            searchText = words.join("+");
            if (searchText != "") {
                searchCall(searchText);
            }
        }
    });
    
});

function init() {
    /*var keyword = localStorage.getItem('search-argument');
    if (keyword) {
        this.keyword = keyword;
        $(".loadingStuff").css("visibility", "initial");
        localStorage.removeItem('search-argument');
        $("#searchBar").val(keyword);
        callToServer(keyword);
    }*/
    
    firstCall();
}
function firstCall(){
    $.get("http://cors-anywhere.herokuapp.com/https://wall.alphacoders.com/api2.0/get.php?auth=5c008711ad4f2de33a360d34984a51b4&method=category&id=32", function (data) {
        serverCallback(data);
    });
}

function searchCall(query) {
    $("#searchResultsHolder").empty();
    $.get("http://cors-anywhere.herokuapp.com/https://wall.alphacoders.com/api2.0/get.php?auth=5c008711ad4f2de33a360d34984a51b4&method=search&term=" + query, function (data) {
        console.log(data);
        serverCallback(data);
    });

}

function serverCallback(data) {
    console.log(data);
    var searchResultsHolder = document.getElementById("searchResultsHolder");

    for (x = 0; x < 28;) {
        var rowDiv = document.createElement("div");
        rowDiv.className = "row content-row";

        for (y = 1; y <= 4; y++) {
            var col = document.createElement("div");
            col.className = "col-md-3";

            var a = document.createElement("a");
            a.href = data.wallpapers[x].url_image;
            a.target = "_blank";
           
            a.className = "list-group-item";
            var aDivMedia = document.createElement("div");
            aDivMedia.className = "media";
            var aDivMediaFigure = document.createElement("figure");
            aDivMediaFigure.className = "pull-left";
            var aDivMediaFigureImg = document.createElement("img");
            aDivMediaFigureImg.className = "media-object img-rounded img-responsive";

            aDivMediaFigureImg.src = data.wallpapers[x].url_thumb;

            var aDivMediaFigureP = document.createElement("p");
            aDivMediaFigureP.innerHTML = data.wallpapers[x].width + " X " + data.wallpapers[x].height;

            aDivMediaFigure.appendChild(aDivMediaFigureP);
            aDivMediaFigure.appendChild(aDivMediaFigureImg);
            
            aDivMedia.appendChild(aDivMediaFigure);
            a.appendChild(aDivMedia);
            col.appendChild(a);
            rowDiv.appendChild(col);
            x++;
        }
        searchResultsHolder.appendChild(rowDiv);
    }
    
    
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
    $.ajax({
        url: 'http://www.giantbomb.com/api/search/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&query="' + keyword + '"&resources=game',
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
    
}




