$(document).ready(function () {
    init();
});

function init() {
    var keyword = localStorage.getItem('search-argument');
    if (keyword) {
        console.log("Success");
        localStorage.removeItem('search-argument');
        $("#searchBar").val(keyword);
        callToServer(keyword);
    }
}

function serverCallback(data) {
    console.log(data);
}

function callToServer(keyword) {
    $.ajax({
        url: 'http://www.giantbomb.com/api/search/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&query="' + keyword + '"&resources=game',
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
}




