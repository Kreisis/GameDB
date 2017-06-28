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