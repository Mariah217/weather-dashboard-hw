//Step 1: create static selector variables ✔️
//Step 2: onclick for search button ✔️
//Step 3: grab input values from textbox and put in local storage ✔️
//Step 4: unhide 5-day forecast cards
//Step 5: add API
//Step 6: create add event listener for quick select city buttons
//Step 7: create fetch request for data

//api key
var APIKey = "789d6254dc04a55a39b161980f745319";

//Variables:
var searchCityEl = document.querySelector("#search-city");
var searchBtn = document.querySelector("#search-button");
var city;
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

var cityArrayBtns = ["austin", "chicago", "newyork", "orlando", "sanfransisco", "seattle", "denver", "atlanta"]

var currentWeatherArray = ["weather", "current-temp", "current-wind", "current-humidity", "current-index"]

//function to put text from textarea into local storage//
function searchInput(){
    document.getElementById("search-city");
    var search = document.getElementById("search-city").value;
    localStorage.setItem("search-city", search);
    console.log(search);
}

//api search
fetch (apiUrl)
    .then(function (response){
        return response.json();
    })
.then (function (data){
    for (let i = 0; index < data.length; index++) {
       
    }
})

//function to display search results under city name and date and cards. Unhide cards (use visible for bootstrap)
// function displaySearch ()










