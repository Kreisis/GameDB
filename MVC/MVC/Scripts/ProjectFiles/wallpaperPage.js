$(document).ready(function () {

    $("#searchButton").on("click", function () {
        var searchText = $("#searchBar").val().trim();
        var words = searchText.split(" ");
        searchText = words.join("+");
        if (searchText != "") {
            window.open("/Wallpaper/Search?query=" + searchText, "_self");
        }

    })
    
    $('#searchBar').keypress(function (e) {
        if (e.which == 13) {
            var searchText = $("#searchBar").val().trim();
            var words = searchText.split(" ");
            searchText = words.join("+");
            if (searchText != "") {
                window.open("/Wallpaper/Search?query=" + searchText, "_self");
            }
        }
    });
    
});