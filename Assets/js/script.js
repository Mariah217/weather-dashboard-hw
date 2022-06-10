//Step 1: create static selector variables  ✔️
//Step 2: create addEventListener for search button
//Step 3: grab input values from textbox and put in local storage
//Step 4: unhide 5 day forecast cards
//Step 5: add API
//Step 6: create add event listener for quick select city buttons


//use addeventlistener for search button to trigger function for search textarea

//Variables:
var searchCityEl = document.querySelector("#search-city");
var searchBtn = document.querySelector("#search-button");

var cityArrayBtns = ["austin", "chicago", "newyork", "orlando", "sanfransisco", "seattle", "denver", "atlanta"]

var currentWeather = ["weather", "current-temp", "current-wind", "current-humidity", "current-index"]

// function displaySearch ()


//function to put text from textarea into local storage//
function searchInput(){
    document.getElementById("search-city");
    var search = document.getElementById("search-city").value;
    localStorage.setItem("search-city", search);
    console.log(search);
}













