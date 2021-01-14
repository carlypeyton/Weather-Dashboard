# Weather-Dashboard

Link to Github Repository: https://github.com/carlypeyton/Weather-Dashboard
Link to Deployed Application: https://carlypeyton.github.io/Weather-Dashboard/

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

Upon loading page, last searched city weather and forecast is displayed:
<img src = "Screenshots/Screen Shot 2021-01-14 at 11.10.41 AM.png">
As I search for cities, they are added to my search history on the left side of the page, and the current weather/forecast is displayed for searched city:
<img src = "Screenshots/Screen Shot 2021-01-14 at 11.11.07 AM.png">
When I select a city from my search history list, the current weather and forecast is displayed for that city:
<img src = "Screenshots/Screen Shot 2021-01-14 at 11.11.18 AM.png">
When I select the Clear Search History button, the search history list is emptied: 
<img src = "Screenshots/Screen Shot 2021-01-14 at 11.11.29 AM.png">