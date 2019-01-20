$(document).ready(function() {


var gifSearch= $("#gifSearch").val().trim();
var gifSearchButton = $("#makeGifs");
var queryURL;
var gifZone = $("#gifZone");

gifSearchButton.click(function(event) {
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=UQlAY3AHnV7hwkRT2LuYZ3yzeoCA9smT";
    $.ajax({
        URL: queryURL,
        method: "GET",
    }).then(function(info) {
        for (i=0; i<=10; i++) {
            gifZone.append("<div>").addClass("col l2 offset-l1 s6").append("<img src='" + info.data[i].images.fixed_width.url + "'")
            // gifZone.append(info.data[i].images.fixed_width.url);
            // gifZone.append()
            
        }
    });
});



});