$(document).ready(function () {
    init();
});

function init() {
    var id = localStorage.getItem("game-id");
    callToServer(id);
}

function serverCallback(data) {
    console.log(data);
    $("#title").html(data.results.name);
    $("#image").attr("src", data.results.image.medium_url);
    var tmp = data.results.description.replace(/<img .*?>/g, "");
    $("#description").html(tmp);
}

function callToServer(gameId) {
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id,deck,name,description",
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
}




