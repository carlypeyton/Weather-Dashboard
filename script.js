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
