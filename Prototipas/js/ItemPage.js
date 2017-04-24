var initialTop;
$(document).ready(function () {
    init();
    initialTop = $(".left-sidebar").position().top;
    var leftImage = new Image();
    leftImage.src = $('.left-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
    var rightImage = new Image();
    rightImage.src = $('.right-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
    /*$(".left-sidebar").css('background-position-x', -leftImage.width / 8);*/
    /*$(".right-sidebar").css('background-position-x', -rightImage.width / 8);*/
    $(window).scroll(function () {
        var st = $(this).scrollTop();
        /*$('.left-sidebar').height($('.left-sidebar') + st);*/
        if (initialTop >= st) {
            var newTop = initialTop - st;
            $('.left-sidebar').css('top', newTop + 'px');
            $(".right-sidebar").css('top', newTop + "px");
        }
        else if ($(".left-sidebar").position().top > 0) {
            var newTop = 0;
            $('.left-sidebar').css('top', newTop + 'px');
            $(".right-sidebar").css('top', newTop + 'px');
        }
    }).scroll();
    $(window).on('load', function () {
        
    });
});


function init() {
    var id = localStorage.getItem("game-id");
    if (localStorage["HistoryArray"] == null) {
        var ar = [];
        ar[0] = id;
        localStorage.setItem('HistoryArray', JSON.stringify(ar));
    }
    else {
        var ar = JSON.parse(localStorage.getItem("HistoryArray"));
        ar.unshift(id);
        if (ar.length > 20) {
            ar.pop();
        }
        localStorage.setItem('HistoryArray', JSON.stringify(ar));
    }
    callToServer(id);
}

function serverCallback(data) {
    console.log(data);
    $("#title").html(data.results.name);
    $("#image").attr("src", data.results.image.medium_url);
    $("#deck").html(data.results.deck);

    if (data.results.original_release_date != null) {
        $("#deck").append("<br/><br/>Original release date: ");
        $("#deck").append(data.results.original_release_date);
    }
    if (data.results.developers != null) {
        $("#deck").append("<br/><br/>Developers: ");
        var str = "";
        data.results.developers.forEach(function (item) {
            str += item.name + ";  ";
        });
        str = str.slice(0, -3);
        $("#deck").append(str);
    }
    if (data.results.platforms != null) {
        $("#deck").append("<br/><br/>Platforms: ");
        var str = "";
        data.results.platforms.forEach(function (item) {
            str += item.name + ";  ";
        });
        str = str.slice(0, -3);
        $("#deck").append(str);
    }
    if (data.results.publishers != null) {
        $("#deck").append("<br/><br/>Publishers: ");
        var str = "";
        data.results.publishers.forEach(function (item) {
            str += item.name + ";  ";
        });
        str = str.slice(0, -3);
        $("#deck").append(str);
    }
    

    var tmp = data.results.description.replace(/<figure .*?>/g, "");
    tmp = tmp.replace(/<a .*?>/g, "");
    tmp = tmp.replace(/<img .*?>/g, "");
    tmp = tmp.replace(/<figcaption .*?>/g, "");
    $("#description").html(tmp);
    $(window).on('load', function () {
        var textHeight = $("#deck").height();
        $("#deck").css("height", Math.max($("#deck").height(), $("#image").height()));
        $("#image").css("height", Math.max($("#deck").height(), $("#image").height()));
        $("#deck").css("padding-top", ($("#deck").height() - textHeight) / 2);
        $("#deck").css("padding-bottom", ($("#deck").height() - textHeight) / 2);
    });
}

function callToServer(gameId) {
    $.ajax({
        url: "http://www.giantbomb.com/api/game/3030-" + gameId + "/?api_key=739777161fa7c039190e538d0715c9671c146cb1&format=jsonp&field_list=image,id,deck,name,description,developers,platforms,publishers,similar_games,original_release_date",
        type: "get",
        data: { json_callback: "serverCallback" },
        dataType: "jsonp"
    });
}




