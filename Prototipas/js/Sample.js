$(document).ready(function () {
    init();
});
var list = [{ "id": "side-pic-a", "gameId": 20964 }, { "id": "side-pic-b", "gameId": 4725 }];

function init() {
    list.forEach(function (item) {
        callToServer(item.gameId)
    });
}

function gamer(data) {
    list.forEach(function (item) {
        if (item.gameId === data.results.id) {
            (document).getElementsByClassName(item.id)[0].src = data.results.image.medium_url;
        }
    });
}

function callToServer(gameId) {
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id",
        type: "get",
        data: { json_callback: "gamer"},
        dataType: "jsonp"
    });
}