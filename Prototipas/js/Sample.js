$(document).ready(function () {
    fixImageDimensions();
    init();
});

function init() {
    list.forEach(function (item) {
        callToServer(item.gameId[0]);
    });
}

var list = [{ "id": "side-pic-a", "gameId": [20964], "type": "tall" , "idIndex": -1},
    { "id": "side-pic-b", "gameId": [4725], "type": "tall", "idIndex": -1 },
    { "id": "pic-a-1", "gameId": [20964], "type": "wide", "idIndex": -1 },
    { "id": "pic-a-2", "gameId": [4725], "type": "wide", "idIndex": -1 },
    { "id": "pic-b-1", "gameId": [4725], "type": "square", "idIndex": -1 },
    { "id": "pic-b-2", "gameId": [4725], "type": "square", "idIndex": -1 },
    { "id": "bottom-pic-1", "gameId": [4725], "type": "wide", "idIndex": -1 },
    { "id": "bottom-pic-2", "gameId": [4725], "type": "wide", "idIndex": -1 },
    { "id": "bottom-pic-3", "gameId": [4725], "type": "wide", "idIndex": -1 }];

function fixImageDimensions() {
    $(".a-pic").css("height", $(".b-pic").height());
    $(".side-pic").css("height", ($(".a-pic").outerHeight(true) + $(".a-pic").height()));
    $(".bottom-pic").css("height", $(".bottom-pic-mid").height());
    /*$(".game-name-text").css("line-height", $(".game-name-text").height());*/
}

function gamer(data) {
    console.log(data);
    list.forEach(function (item) {
        if (item.gameId[0] === data.results.id) {
            if (item.type == "wide") {
                var height = $("#" + item.id).height();
                /*(document).getElementsByClassName(item.id)[0].src = data.results.image.medium_url;*/
                $("#" + item.id).attr('src', data.results.image.screen_url);
                $("#" + item.id).css("height", height);
            }
            else {
                var height = $("#" + item.id).height();
                /*(document).getElementsByClassName(item.id)[0].src = data.results.image.medium_url;*/
                $("#" + item.id).attr('src', data.results.image.medium_url);
                $("#" + item.id).css("height", height);
            }
                      
        }
    });
}

function callToServer(gameId) {
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id",
        type: "get",
        data: { json_callback: "gamer" },
        dataType: "jsonp"
    });
}


