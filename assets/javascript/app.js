

$("#input").on("submit", function() {
  event.preventDefault();

  var band = $("#band").val();
  $("#buttons").append("<button class='band-name'>" + band + "</button>");
  $(".band-name").attr("id", band);
  
  $("button").on("click", function() {
      var bandImg = $(band);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=dc6zaTOxFJmzC&limit=10";

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