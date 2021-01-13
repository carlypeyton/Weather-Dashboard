//Define variables, set Jquery for search button, and API key for Open Weather API
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var cityButton = $(".city-button");
var searchNumber = 0;
var APIKey = "8a765c5347e389c1aced234b02a046d5";
var city;
var citySearch = $("#city-search").val();

//Hide containers to begin with
$(".history-container").hide();
$("#forecast").hide();
$("#current-weather").hide();
$(".list-group-item").hide();

//Enter key for searching as well as search button
$("#city-search").keypress(function (event) {
    if (event.keyCode === 13) {
        // event.preventDefault();
        $("#search-button").click();
    }
});

//Function for search button click event
searchButton.click(function () {
    //Show hidden containers
    $(".history-container").show();
    $("#forecast").show();
    $("#current-weather").show();
    //Variable for city user is searching
    let citySearch = $("#city-search").val();
    // Variable for current weather  
    let currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&Appid=" + APIKey + "&units=imperial";
    //As long as the city search is not an empty string
    if (citySearch == "") {
        return citySearch;
    } else {
        //log the searched city to console
        console.log(citySearch);
        //AJAX get request for current weather 
        $.ajax({
            url: currentWeatherAPI,
            method: "GET"
        }).then(function (response) {
            //Get rid of border and white background around list group
            $(".list-group").attr('style', 'border: none');
            $(".list-group").addClass('bg-light');
            //Add class to list group and prepend list item with list-group-items for each city
            let searchHistory = $(".list-group").addClass("list-group-item");
            searchHistory.prepend("<button type='button' class='list-group-item list-group-item-action city-button'>" + response.name + "</button>");
            localStorage.setItem(searchNumber, response.name);
            //Clear searched term from input field
            $("#city-search").val('');
            searchNumber = searchNumber + 1;
            //Current Weather
            //Convert temperature to fahrenheit, fix to 1 decimal place
            let tempF = (response.main.temp).toFixed(1);
            //transfer content to HTML
            $("#city-name").html(response.name);
            $("#temperature").text(tempF + " °F");
            $("#humidity").text(response.main.humidity + "%");
            $("#wind-speed").text(response.wind.speed + " MPH");
            //Set current date*******************
            let currentDay = moment().format(" (M/D/YYYY)");
            $(".current-date").append(currentDay);
            $(".current-date").append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" id="current-weather-icon">`);
            //Log to console to check functionality
            console.log(response);
            console.log(response.name);
            console.log(response.main.temp);
            console.log(response.main.humidity);
            console.log(response.wind.speed);

            // Variable for current weather UV index
            let currentWeatherUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            //AJAX get request for current weather UV index
            $.ajax({
                url: currentWeatherUV,
                method: "GET"
            }).then(function (response) {
                //Set value of UV index
                $("#uv-index").empty();
                $("#uv-index").text(response.value);
                let uvindex = response.value;
                //Change color of background on UV index based on scale
                if (uvindex <= 3) {
                    $("#uv-index").addClass("low");
                    $("#uv-index").removeClass("medium");
                    $("#uv-index").removeClass("high");
                    $("#uv-index").removeClass("very-high");
                } else if (uvindex >= 3 && uvindex <= 6) {
                    $("#uv-index").addClass("medium");
                    $("#uv-index").removeClass("low");
                    $("#uv-index").removeClass("high");
                    $("#uv-index").removeClass("very-high");
                } else if (uvindex >= 6 && uvindex <= 8) {
                    $("#uv-index").addClass("high");
                    $("#uv-index").removeClass("medium");
                    $("#uv-index").removeClass("low");
                    $("#uv-index").removeClass("very-high");
                } else {
                    $("#uv-index").addClass("very-high");
                    $("#uv-index").removeClass("medium");
                    $("#uv-index").removeClass("high");
                    $("#uv-index").removeClass("low");
                }
            });
        });
    }
});
