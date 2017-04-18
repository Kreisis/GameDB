var initialTop;
$(document).ready(function () {
    init();
    initialTop = $(".left-sidebar").position().top;
    var leftImage = new Image();
    leftImage.src = $('.left-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
    var rightImage = new Image();
    rightImage.src = $('.right-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
    $(".left-sidebar").css('background-position-x', -leftImage.width / 8);
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
        console.log("scroll top: " + st + "; initial top: " + initialTop + "; current top: " + $(".left-sidebar").position().top);
    }).scroll();
    $(window).on('load', function () {
        
    });
});


function init() {
    var id = localStorage.getItem("game-id");
    callToServer(id);
}

function serverCallback(data) {
    console.log(data);
    $("#title").html(data.results.name);
    $("#image").attr("src", data.results.image.medium_url);
    $("#actual-deck").html(data.results.deck);

    if (data.results.original_release_date != null) {
        $("#release-date").append(data.results.original_release_date);
    }
    else {
        $("#release-date").append("Not Found");
    }
    

    var tmp = data.results.description.replace(/<figure .*?>/g, "");
    tmp = tmp.replace(/<a .*?>/g, "");
    tmp = tmp.replace(/<img .*?>/g, "");
    tmp = tmp.replace(/<figcaption .*?>/g, "");
    $("#description").html(tmp);
    $(window).on('load', function () {
        $("#deck").css("height", 0);
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




