
var gifSearchButton = $("#makeGifs");
var gifZone = $("#gifZone");
var gifButtons = $(".gifButtons");
var topics = ["dogs","cats","laughing"];
var imgDiv = $("#gifZone div")
var gifImg = $("#gifZone div img");
const gifText = $("#gifZone div p");

function getGifs(queryURL) {
    gifZone.hide();
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(info) {
        console.log(info);
        $.each(gifImg, function(i, elem) {
            console.log(i, elem)
            $(elem).attr("src", info.data[i].images.fixed_width.url);
            $(elem).attr("still", info.data[i].images.fixed_width_still.url);
            $(elem).attr("move", info.data[i].images.fixed_width.url);
            $(gifText[i]).text("Title: " + info.data[i].title + " / " + "Rating: " + info.data[i].rating)
            $(elem).click(function() {
                var still = $(this).attr("still");
                var move = $(this).attr("move");
                if ($(this).attr("src") == still) {
                    $(this).attr("src", move);
                } else {
                    $(this).attr("src", still);
                };
            });
            gifZone.show();
        });
    });
};

//Justin API Key IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6
//My API Key UQlAY3AHnV7hwkRT2LuYZ3yzeoCA9smT

function makeButtons() {
    var gifSearch = $("#gifSearch").val();
    if (topics.indexOf(gifSearch.toLowerCase()) == -1 && gifSearch != "") {
        topics.push(gifSearch)
    };
    // gifButtons.empty();
        topics.forEach(function(elem) {
            var buttons = $("<button>").addClass("btn btn-small smallwhitebutton").text(elem);
            buttons.attr("data", elem.trim());
            //create click function for that button
            buttons.click(function() {
                gifZone.hide();
                var searchItem = $(this).attr("data");
                let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6";
                getGifs(queryURL);
            });
        gifButtons.append(buttons);
    });
};

gifSearchButton.click(function(event) {
    makeButtons();
    gifZone.hide();
    let searchItem = $("#gifSearch").val().trim().toLowerCase();
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6";
    getGifs(queryURL);
});


$("input").on("keypress", function(event) {
    if (event.charCode == 13) {
        makeButtons();
        gifZone.hide();
        event.preventDefault();
    };
    let searchItem = $("#gifSearch").val().trim().toLowerCase();
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=IzBmA6Dpos0EdfXIav4LTX8PYpp03Nj6";
    getGifs(queryURL);
});

$("#clearGifs").click(function() {
    gifZone.hide();
});
gifZone.hide();
makeButtons();