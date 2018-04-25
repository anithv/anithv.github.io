/** 
  * Written by Anith Vishwanath 
 **/
var celTempDisplay;
var fahrTempDisplay;

$(document).ready(function() {
  $("#temp").html("<p class='lead'>Loading...</p>");
  //Geolocation API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, errPosition);
  } else {
    console.log("Geolocation error.");
  }

  function getPosition(position) {
    var latitude = "lat=" + position.coords.latitude;
    var longitude = "lon=" + position.coords.longitude;
    getWeather(latitude, longitude);
  }

  function errPosition(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        $("#temp").html("Request Denied.");
        break;
      case error.POSITION_UNAVAILABLE:
        $("#temp").html("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        $("#temp").html("Request timed out.");
        break;
      case error.UNKNOWN_ERROR:
        $("#temp").html("An unknown error occurred.");
        break;
    }
  }
});

function convertUnits() {
  $("#weather-toggle").prop("disabled", false);
  $("#weather-toggle").click(function() {
    var currentUnit = $("#unit").text();
    var newUnit = currentUnit == "C" ? "F" : "C";
    $("#unit").text(newUnit);
    if (newUnit == "F") {
      fahrTempDisplay = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahrTempDisplay + String.fromCharCode(176));
    } else {
      $("#temp").text(celTempDisplay + String.fromCharCode(176));
    }
  });
}

//Weather API stuff.
function getWeather(latitude, longitude) {
  var apiLink = "https://fcc-weather-api.glitch.me/api/current?";
  var unit = "C";
  var link = apiLink + latitude + "&" + longitude;

  //callback function
  $.ajax({
    url: link,
    success: function(value) {
      $("#city").text(value.name + ", ");
      $("#country").text(value.sys.country);
      celTempDisplay = Math.round(value.main.temp * 10 / 10);
      $("#temp").text(celTempDisplay + String.fromCharCode(176));
      $("#unit").text(unit);
      $("#description").text(value.weather[0].main);
      //backgroundColour();
      convertUnits();
      showIcons(value);
    }
  });

  function showIcons(value) {
    var icon = value.weather[0].main.toLowerCase();
    var skycons = new Skycons({ color: "black" }),
      list = [
        "clear-day",
        "clear-night",
        "partly-cloudy-day",
        "partly-cloudy-night",
        "cloudy",
        "rain",
        "sleet",
        "snow",
        "wind",
        "fog"
      ],
      i;

    for (i = list.length; i--; ) {
      if (icon === "clouds") {
        skycons.set("weather-icon", list[4]);
        skycons.play();
      } else if (icon === "rain" || icon == "thunderstorm") {
        skycons.set("weather-icon", list[5]);
        skycons.play();
      } else if (icon === "haze" || icon === "mist") {
        skycons.set("weather-icon", list[9]);
        skycons.play();
      } else if (icon === "snow") {
        skycons.set("weather-icon", list[7]);
        skycons.play();
      } else if (icon === "clear") {
        skycons.set("weather-icon", list[0]);
        skycons.play();
      } else {
        skycons.remove("weather-icon");
      }
    }
  }

  /*function backgroundColour() {
    if (celTempDisplay < 30) {
      $("body").css("background-color", "#0066dc");
    } else if (celTempDisplay >= 30 && celTempDisplay < 36) {
      $("body").css("background-color", "#dc6600");
    } else if (celTempDisplay >= 36) {
      $("body").css("background-color", "#dc0008");
    }
  }*/
}