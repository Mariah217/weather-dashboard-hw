//Step 1: create static selector variables ✔️
//Step 2: onclick for search button ✔️
//Step 3: grab input values from textbox and put in local storage ✔️
//Step 4: unhide 5-day forecast cards when api is pulled
//Step 5: add API ✔️
//Step 6: create add event listener for quick select city buttons ✔️
//Step 7: create fetch request for data and put on page 
//Step 8: pull from local storage and put into search history buttons

//api key
var weatherAPIKey = "789d6254dc04a55a39b161980f745319";
var mqAPIKey = "ASQOwbxDB04Msto95WtOdZ0yT8xPwGOG";

//Variables:
var searchCityEl = document.querySelector("#search-city");
var city = document.querySelector("#search-city").value;
var searchBtn = document.querySelector("#search-button");
var userFormEl = document.querySelector("#user-form");
var dateEL = document.querySelector(".card-title");
var historyContainerEl = document.querySelector("history");

/*need to create variables for lat, lon and units*/
/*need to use seperate api for 5-day forecast than the main city name and date*/

// var weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&unite=${units}&exclude=hourly&appid=${weatherAPIkey}`;
var mapqApiUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=${city}`;

var currentWeatherArray = ["weather", "current-temp", "current-wind", "current-humidity", "current-index"]

//function to put text from textarea into local storage
function searchInput() {
    var search = document.getElementById("search-city").value; //getting input value from search-city
    var citiesToSave = []; //blank array
    if (localStorage.getItem("search-city")){ //getting search-city info from ls
        var localStorageHistoryJson = localStorage.getItem("search-city"); //created var for local story history
        citiesToSave = JSON.parse(localStorageHistoryJson); //parsing ls and putting it into the citiesToSave array
    }
    citiesToSave.push(search); //this adds a string to the end of an array
    localStorage.setItem("search-city", JSON.stringify(citiesToSave)); //putting search-city into ls as a string.
    // getApi()
    displaySearchHistory();
}

//local storage parse to save info in search history buttons
function displaySearchHistory(event) {
    if (event) {
        event.preventDefault(); //preventing page refresh
    }
    if (localStorage.getItem("search-city")) {
        var previousSearchedCities = JSON.parse(localStorage.getItem("search-city")); //getting input info from local storage

        var cityIterationCount = 5;
        if (previousSearchedCities.length <= 5) { //if local storage array is less than or equal to five
            cityIterationCount = previousSearchedCities.length; //change city iteration count to equal however many elements are in the array (1,2,3 etc.)
        }
        for (let i = 0; i < cityIterationCount; i++) { //for loop parameters
            var button = document.createElement('button') //creating button in html
            var historyDiv = document.getElementById("history");//var for history div in html
            button.innerHTML = previousSearchedCities[previousSearchedCities.length -i -1];//pulling text from local storage and putting it on buttons, only saves most recent 5 searched cities.
            historyDiv.appendChild(button); //appending button to history div
        }
    }

    // document.getElementById("search-history").innerHTML = localStorageHistory;  //put text on the screen

}

displaySearchHistory();

//api search
function getWeather(event) {
    event.preventDefault();

    fetch(weatherApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; index < data.length; index++) {

            }
        })
}

//function to display search results under city name and date and cards. Unhide cards (use visible for bootstrap)
// function displaySearch ()


