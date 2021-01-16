//Figure out how, when loading page for very first time, 
//to hide containers if nothing in local storage

//Define variables, set Jquery for search button, and API key for Open Weather API
let searchButton = $("#search-button");
let clearButton = $("#clear-button");
let cityButton = $(".city-button");
let searchNumber = 0;
let APIKey = "8a765c5347e389c1aced234b02a046d5";
let city;
let citySearch = $("#city-search").val();

//Hide containers to begin with
$(".history-container").hide();
$("#forecast").hide();
$("#current-weather").hide();
$(".list-group-item").hide();

//Enter key for searching as well as search button
$("#city-search").keypress(function (event) {
    if (event.keyCode === 13) {
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
    if (citySearch === "") {
        return citySearch;
    } else {
        //log the searched city to console
        console.log(citySearch);
        //AJAX get request for current weather 
        $.ajax({
            url: currentWeatherAPI,
            method: "GET"
        }).then(function (response) {
            //Log to console to check functionality
            console.log(response);
            console.log(response.name);
            console.log(response.main.temp);
            console.log(response.main.humidity);
            console.log(response.wind.speed);
            //Get rid of border and white background around list group
            $(".list-group").attr('style', 'border: none');
            $(".list-group").addClass('bg-light');
            //Add class to list group and prepend list item with list-group-items for each city
            let searchHistory = $(".list-group").addClass("list-group-item");
            searchHistory.prepend("<button type='button' class='list-group-item list-group-item-action city-button'>" + response.name + "</button>");
            //Clicking on city button in search history gets weather/forecast for that city
            $(".city-button").on("click", function () {
                let city = $(this).text();
                console.log($(this).text());
                let cityButtonAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&Appid=" + APIKey + "&units=imperial";
                //AJAX request to get current weather for city button clicked
                $.ajax({
                    url: cityButtonAPI,
                    method: "GET"
                }).then(function (response) {
                    $(this).text('');
                    //transfer content to HTML
                    $("#city-name").html(response.name);
                    let tempF = (response.main.temp).toFixed(1);
                    $("#temperature").text(tempF + " °F");
                    $("#humidity").text(response.main.humidity + "%");
                    $("#wind-speed").text(response.wind.speed + " MPH");
                    //Set current date
                    let currentDay = moment().format(" (M/D/YYYY)");
                    $(".current-date").append(currentDay);
                    $(".current-date").append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" id="current-weather-icon">`);
                    // Variable for current weather UV index
                    let cityButtonUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
                    //AJAX get request for city button UV index
                    $.ajax({
                        url: cityButtonUV,
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
                    // Variable for 5 day forecast 
                    let cityButtonForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&Appid=" + APIKey + "&units=imperial";
                    //AJAX get request for forecast weather 
                    $.ajax({
                        url: cityButtonForecast,
                        method: "GET"
                    }).then(function (response) {
                        //For loop for 5 days
                        var i;
                        for (i = 0; i < 5; i++) {
                            //Define variables for responses
                            let date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                            let iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
                            let iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                            let tempF = (response.list[((i + 1) * 8) - 1].main.temp).toFixed(1);
                            let humidity = response.list[((i + 1) * 8) - 1].main.humidity;
                            //Update HTML with date, forecast image, and weather
                            $("#forecast-date" + i).html(date);
                            $("#forecast-image" + i).html("<img src=" + iconurl + ">");
                            $("#forecast-temperature" + i).html(tempF + " °F");
                            $("#forecast-humidity" + i).html(humidity + "%");
                        }
                    });
                });
            });
            //Save search to local storage
            localStorage.setItem('user-search', response.name);
            //Clear searched term from input field
            $("#city-search").val('');
            //Convert temperature to fahrenheit, fix to 1 decimal place
            let tempF = (response.main.temp).toFixed(1);
            //transfer content to HTML
            $("#city-name").html(response.name);
            $("#temperature").text(tempF + " °F");
            $("#humidity").text(response.main.humidity + "%");
            $("#wind-speed").text(response.wind.speed + " MPH");
            //Set current date
            let currentDay = moment().format(" (M/D/YYYY)");
            $(".current-date").append(currentDay);
            $(".current-date").append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" id="current-weather-icon">`);
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

            // Variable for 5 day forecast 
            let forecastWeatherAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&Appid=" + APIKey + "&units=imperial";
            //AJAX get request for forecast weather 
            $.ajax({
                url: forecastWeatherAPI,
                method: "GET"
            }).then(function (response) {
                //For loop for 5 days
                var i;
                for (i = 0; i < 5; i++) {
                    //Define variables for responses
                    let date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                    let iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
                    let iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                    let tempF = (response.list[((i + 1) * 8) - 1].main.temp).toFixed(1);
                    let humidity = response.list[((i + 1) * 8) - 1].main.humidity;
                    //Update HTML with date, forecast image, and weather
                    $("#forecast-date" + i).html(date);
                    $("#forecast-image" + i).html("<img src=" + iconurl + ">");
                    $("#forecast-temperature" + i).html(tempF + " °F");
                    $("#forecast-humidity" + i).html(humidity + "%");
                }
            });
        });
    }
});

//Function for clear search history button click event
clearButton.click(function () {
    let searchHistory = $(".list-group-item");
    $(".search-history").empty();
    $(".history-container").hide();
    localStorage.removeItem(searchHistory);
});


////////////////////////FROM HERE BELOW TO GO////////////////////////////

//Function to load last city searched for weather and forecast
window.onload = function loadLastCity() {
    let lastCity = localStorage.getItem('user-search');
    console.log(lastCity);
   //ON PAGE LOAD, IF THE VALUE OF LAST CITY IS NOT NULL, THEN DO _____ THIS. IF NULL, THEN HIDE CONTAINERS
    if (localStorage.getItem("user-search") === null) {
        $(".history-container").hide();
        $("#forecast").hide();
        $("#current-weather").hide();
        $(".list-group-item").hide();
        return;
    } else {
        let lastCityAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + lastCity + "&Appid=" + APIKey + "&units=imperial";
        $.ajax({
            url: lastCityAPI,
            method: "GET"
        }).then(function (response) {
            //Show hidden containers
            $(".history-container").show();
            $("#forecast").show();
            $("#current-weather").show();
            //transfer content to HTML
            $("#city-name").html(response.name);
            let tempF = (response.main.temp).toFixed(1);
            $("#temperature").text(tempF + " °F");
            $("#humidity").text(response.main.humidity + "%");
            $("#wind-speed").text(response.wind.speed + " MPH");
            //Set current date
            let currentDay = moment().format(" (M/D/YYYY)");
            $(".current-date").append(currentDay);
            $(".current-date").append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png" id="current-weather-icon">`);
            // Variable for current weather UV index
            let lastCityUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;
            //AJAX get request for city button UV index
            $.ajax({
                url: lastCityUV,
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
            // Variable for 5 day forecast 
            let lastCityForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + lastCity + "&Appid=" + APIKey + "&units=imperial";
            //AJAX get request for forecast weather 
            $.ajax({
                url: lastCityForecast,
                method: "GET"
            }).then(function (response) {
                //For loop for 5 days
                var i;
                for (i = 0; i < 5; i++) {
                    //Define variables for responses
                    let date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                    let iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
                    let iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                    let tempF = (response.list[((i + 1) * 8) - 1].main.temp).toFixed(1);
                    let humidity = response.list[((i + 1) * 8) - 1].main.humidity;
                    //Update HTML with date, forecast image, and weather
                    $("#forecast-date" + i).html(date);
                    $("#forecast-image" + i).html("<img src=" + iconurl + ">");
                    $("#forecast-temperature" + i).html(tempF + " °F");
                    $("#forecast-humidity" + i).html(humidity + "%");
                }
            });
        });
    }
}