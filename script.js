var weatherQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName
+ "&APPID=8c866bc4772f56717eb9f246ee1164bc";
var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName
+ "&APPID=8c866bc4772f56717eb9f246ee1164bc";
var cityName = ''; 
var searchForm = $("#searchForm");
var searchInput = $("#searchInput");
var searchSubmit = $("#searchSubmit");
var cityHistoryArr = [];
var historyColumn = $("#historyColumn");
var forecastDiv = $("#forecast")
var cityHistoryDiv = $("<div id='city history' class='p-2'>");
var currentWeatherDiv = $("#currentWeather");
var cityNameH = $("#cityNameH3");
var cityTemp = $('#temperatureP');
var cityHumidity = $('#humidityP');
var cityWind = $('#windSpeedP');
var UVIndex = $('#UVIndex');

historyColumn.append(cityHistoryDiv);

function historyGen(){
cityHistoryDiv.empty();
cityHistoryArr = JSON.parse(localStorage.getItem("cities"))
if(cityHistoryArr !== null){
for (i=0; i <cityHistoryArr.length && i < 5; i++){
var newCityButton = $("<button class='oldSearch btn-block btn-primary'>");
newCityButton.text(cityHistoryArr[i]);
cityHistoryDiv.append(newCityButton);
}}
}

historyGen();

$(document).on("click", ".oldSearch", function(event){
  cityName = $(this).text();
  console.log("clicked");
  console.log(cityName);
  weatherQueryUrl = getWeatherQuery();
forecastQueryUrl = getForecastQuery();
getWeather();
})

function getWeatherQuery(){
    return weatherQueryUrl = weatherQueryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName
    + "&units=imperial&APPID=8c866bc4772f56717eb9f246ee1164bc";
}

function getForecastQuery(){
        return forcastQueryUrl = forcastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast/?q=" + cityName
        + "&units=Imperial&APPID=8c866bc4772f56717eb9f246ee1164bc";
    }

function getWeather(){
   
    $.ajax({
        url: weatherQueryUrl,
        method: "GET"
      }).then(function (response){
          console.log(response);

        cityNameH.text(response.name);
        $("#weatherIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
        cityTemp.text("Temperature: " + response.main.temp + "°F");
        cityHumidity.text("Humidity: " + response.main.humidity + "%")
        cityWind.text("Wind Speed" + response.wind.speed + "mph");
        let coord = response.coord;
        
        getUV(coord);
        

      });

      $.ajax({
        url: forecastQueryUrl,
        method: "GET"
      }).then(function (response){
          forecastDiv.empty();
          console.log(response);
          for (i = 4; i<response.list.length; i += 8){
            var newForecastDiv  = $("<div class='card bg-primary m-2'>");
            var date = response.list[i].dt_txt.substring(0,10);
            var newH6 = $("<h6>");
            var newH7Temp = $("<h7>");
            var newH7Humid = $("<h7>");
            var newIcon = $("<img>");
            newH7Temp.text("Temp: " + response.list[i].main.temp + "°F")
            newH6.text(date);
            newH7Humid.text("Humidity: " + response.list[i].main.humidity + "%");
            newIcon.attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png")
            forecastDiv.append(newForecastDiv);
            newForecastDiv.append(newH6, newIcon, newH7Temp, newH7Humid);

          }
        
      });



}

function getUV(coord){
  console.log(coord)
  let lat = coord.lat;
  let lon = coord.lon;
  UVQueryUrl = ("https://api.openweathermap.org/data/2.5/uvi?appid=8c866bc4772f56717eb9f246ee1164bc&lat=" + lat + "&lon=" + lon)  
$.ajax({

          url: UVQueryUrl,
          method: "GET"
        }).then(function (response){
          console.log(response);
          var UV = response.value;
          console.log(UV);
          UVIndex.text("UV: " + UV);
          if (parseInt(UV) < 3){
            UVIndex.attr("class", "lowUV")
          }
          else if (parseInt(UV) < 7){
            UVIndex.attr("class", "medUV")
          }
          else {
            UVIndex.attr("class", "highUV")

          }
          
          
 })

}

searchForm.on("submit", function(event) {
event.preventDefault();
cityName = searchInput.val();
console.log(cityName);
weatherQueryUrl = getWeatherQuery();
forecastQueryUrl = getForecastQuery();
response = getWeather();

newCities = [];
oldCities = JSON.parse(localStorage.getItem("cities"));
if (oldCities !== null){
  newCities = oldCities;
}

newCities.unshift(cityName);
var storage = JSON.stringify(newCities);
localStorage.setItem("cities", storage);


historyGen();
});
 