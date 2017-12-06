$(document).ready(function () {

var topics = ["Metallica", "Nirvana", "The Story So Far", "Oasis", "Bloc Party"];

for (var i = 0; i < topics.length; i++) {
  $("#buttons").append("<button class='band-name'>" + topics[i] + "</button>");
}

$("#input").on("submit", function() {
  event.preventDefault();

  var band = $("#band").val();
  topics.push(band);

  $("#buttons").append("<button class='band-name'>" + topics.splice(-1) + "</button>");

  $(topics).add(band);
  
  $("button").on("click", function() {

    $("#gifs-appear-here").empty();
    
      var bandImg = $(this).text();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        bandImg + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var bandImage = $("<img>");
            bandImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(bandImage);

            $("#gifs-appear-here").prepend(gifDiv);
          }
        });

      });

    });
});