var initialTop;
$(document).ready(function () {
    
    initialTop = $(".left-sidebar").position().top;
    var leftImage = new Image();
    leftImage.src = $('.left-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");
    var rightImage = new Image();
    rightImage.src = $('.right-sidebar').css('background-image').replace(/"/g, "").replace(/url\(|\)$/ig, "");

    $(window).scroll(function () {
        var st = $(this).scrollTop();
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
    
});




