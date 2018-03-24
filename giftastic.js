// Topics array
var topics = ["Fleetwood Mac", "Elton John", "Cat Stevens", "The Beatles", "Billy Joel"];

$(document).ready(function() {
    // Function to create buttons from array
    function displayButtons() {
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-default topicBtn");
            newButton.attr("type", "button");
            newButton.append(topics[i]);
            newButton.attr("value", topics[i]);
            $("#itemButton").append(newButton);

            console.log(topics);
        }
    }
    displayButtons();

    // AJAX to get the API info
    function getGifs(topic) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.data);
            addImages(response);
        });
    }

    // Create images in div
    function addImages(response) {
        $("#gifs-appear-here").empty();

        for (var i = 0; i < response.data.length; i++) {
            var newGif = $("<img>");
            newGif.addClass("newGifs img-thumbnail grid-item");
            newGif.attr("src", response.data[i].images.fixed_width_still.url);
            newGif.attr("data-state", "still");
            newGif.attr("data-still", response.data[i].images.fixed_width_still.url);
            newGif.attr("data-animate", response.data[i].images.fixed_width.url);

            var gifRating = $("<p>");
            gifRating.append("Rating: " + response.data[i].rating);

            var gifPlusRating = $("<div>");
            gifPlusRating.append(newGif, gifRating);
            gifPlusRating.addClass("grid-item");
            $("#gifs-appear-here").append(gifPlusRating);
        }
    }

    // On Clicks:
    // for new buttons added by user
    $(document).on("click", ".newGifs",function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    // for existing buttons added by me
    $(document).on("click", ".topicBtn", function() {
        console.log("click");
        getGifs($(this).attr("value"));
        console.log($(this).attr("value"));
    });

    $("#searchBtn").on("click", function() {
        //If search bar is empty
        event.preventDefault(); //prevents the page from refreshing when a user hits "enter".

        var searchWord = $(".form-control").val();
        console.log(searchWord);
        $(".form-control").empty();

        topics.push(searchWord);
        $("#itemButton").empty();
        displayButtons();
        getGifs(searchWord);
    });

});