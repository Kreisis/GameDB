$(document).ready(function () {

    $("#searchButton").on("click", function () {
        var searchText = $("#searchBar").val().trim();
        if (searchText != "") {
            window.open('/Search/Discover?query=' + searchText, '_self');
        }
        
    })

    $('#searchBar').keypress(function (e) {
        if (e.which == 13) {
            var searchText = $("#searchBar").val().trim();
            if (searchText != "") {
                window.open('/Search/Discover?query=' + searchText, '_self');
            }
        }
    });
    
});

function init() {
    
    $(window).on("load", function () {
        $(".loadingStuff").css("display", "none");
        $("#rows").css("visibility", "initial");
    });
}

/*var list = [{ "id": "side-pic-a", "gameId": [20964, 41484, 29443, 34975, 49833, 44507, 47342], "type": "tall", "idIndex": -1 },
    { "id": "side-pic-b", "gameId": [39035, 42912, 48113, 36989, 32317, 20654, 42712], "type": "tall", "idIndex": -1 },
    { "id": "pic-a-1", "gameId": [39750, 42581, 38270, 37957, 36765, 42918], "type": "wide", "idIndex": -1 },
    { "id": "pic-a-2", "gameId": [21144, 32686, 35129, 37580, 38538, 40796], "type": "wide", "idIndex": -1 },
    { "id": "pic-b-1", "gameId": [32982, 21662, 32129, 46549, 46557], "type": "square", "idIndex": -1 },
    { "id": "pic-b-2", "gameId": [46549, 21500, 42927, 48207, 50449, 42696], "type": "square", "idIndex": -1 },
    { "id": "bottom-pic-1", "gameId": [37770, 49522, 45405, 33135, 41419, 34407], "type": "wide", "idIndex": -1 },
    { "id": "bottom-pic-2", "gameId": [4725, 38596, 36884, 42905, 49379, 44653, 42915], "type": "wide", "idIndex": -1 },
    { "id": "bottom-pic-3", "gameId": [4725, 16889, 7659, 42034, 6673, 11552], "type": "wide", "idIndex": -1 }];*/
/*
function fixHeight() {
    var heightA, heightB, heightC;
    var sideHeight = 0;
    heightA = $("#pic-a-1").parent().outerHeight();
    heightB = $("#pic-b-1").parent().outerHeight();
    $("#pic-a-1").parent().css('height', Math.max(heightA, heightB));
    $("#pic-b-1").parent().css('height', Math.max(heightA, heightB));
    sideHeight += $("#pic-b-1").parent().outerHeight(true);
    $("#pic-a-1").css('height', $("#pic-a-1").parent().height() - $("#pic-a-1").parent().find(".caption").outerHeight());
    $("#pic-b-1").css('height', $("#pic-b-1").parent().height() - $("#pic-b-1").parent().find(".caption").outerHeight());


    heightA = $("#pic-a-2").parent().outerHeight();
    heightB = $("#pic-b-2").parent().outerHeight();
    $("#pic-a-2").parent().css('height', Math.max(heightA, heightB));
    $("#pic-b-2").parent().css('height', Math.max(heightA, heightB));
    sideHeight += Math.max(heightA, heightB);
    $("#pic-a-2").css('height', $("#pic-a-2").parent().height() - $("#pic-a-2").parent().find(".caption").outerHeight());
    $("#pic-b-2").css('height', $("#pic-b-2").parent().height() - $("#pic-b-2").parent().find(".caption").outerHeight());

    $("#side-pic-a").parent().css('height', sideHeight);
    $("#side-pic-b").parent().css('height', sideHeight);
    $("#side-pic-a").css('height', $("#side-pic-a").parent().height() - $("#side-pic-a").parent().find(".caption").outerHeight());
    $("#side-pic-b").css('height', $("#side-pic-b").parent().height() - $("#side-pic-b").parent().find(".caption").outerHeight());

    heightA = $("#bottom-pic-1").parent().outerHeight();
    heightB = $("#bottom-pic-2").parent().outerHeight();
    heightC = $("#bottom-pic-3").parent().outerHeight();
    $("#bottom-pic-1").parent().css('height', Math.max(heightA, heightB, heightC));
    $("#bottom-pic-2").parent().css('height', Math.max(heightA, heightB, heightC));
    $("#bottom-pic-3").parent().css('height', Math.max(heightA, heightB, heightC));

}*/





