var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName
+ "&APPID=8c866bc4772f56717eb9f246ee1164bc";
var cityName = ''; 
var searchForm = $("#searchForm");
var searchInput = $("#searchInput");
var searchSubmit = $("#searchSubmit");
var cityHistoryArr = [];
var currentWeatherDiv = $("#currentWeather");
var cityNameH = $("#cityNameH3");
var cityTemp = $('#temperatureP');
var cityHumidity = $('#humidityP');
var cityWind = $('#windSpeedP');

function getQuery(){
    return queryUrl = queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName
    + "&APPID=8c866bc4772f56717eb9f246ee1164bc";
}


function getWeather(){
    console.log(queryUrl);
    $.ajax({
        url: queryUrl,
        method: "GET"
      }).then(function (response){
        cityNameH.text(response.name);
        cityTemp.text(((parseInt(response.main.temp) - 273.15) * 9/5 + 32).toFixed(2) + " ");
        cityHumidity.text(response.main.humidity)
        cityWind.text(response.wind.speed);

         

      
        // document.getElementById("city").textContent = response.name;
        // document.getElementById("wind").textContent = response.wind.speed;
        // document.getElementById("humidity").textContent= response.main.humidity;
        // document.getElementById("temp").textContent = ((parseInt(response.main.temp) - 273.15) * 9/5 + 32).toFixed(2);
  
      });



}

// searchSubmit.on("submit", function(event){
//     event.preventDefault();
// });



// searchForm.on("submit", function(event){
//     event.preventDefault(); 
// });
// searchInput.on("submit", function(event){
//     event.preventDefault(); 
// });
// searchSubmit.on("click", function(event){
//     event.preventDefault(); 
// });


searchForm.on("submit", function(event) {
event.preventDefault();
cityName = searchInput.val();
console.log(cityName);
// cityHistoryArr.push(cityName);

queryUrl = getQuery();
response = getWeather();
// console.log(currentWeatherInfo);

});
 