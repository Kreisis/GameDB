$(document).ready(function () {
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

function gamer(data) {
    /*console.log(data);*/
    list.forEach(function (item) {
        if (item.gameId[0] === data.results.id) {
            if (item.type == "wide") {
                $("#" + item.id).attr('src', data.results.image.screen_url);            
            }
            else {
                $("#" + item.id).attr('src', data.results.image.medium_url);
            }   

            var name = data.results.name;
            var deck = data.results.deck;

            $("#" + item.id).parent().find("h3").html(name);
            $("#" + item.id).parent().find("p").html(deck);
        }
    });
}

function callToServer(gameId) {
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id,deck,name",
        type: "get",
        data: { json_callback: "gamer" },
        dataType: "jsonp"
    });
}


