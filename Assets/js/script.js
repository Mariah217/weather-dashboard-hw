//Step 1: create static selector variables ✔️
//Step 2: onclick for search button ✔️
//Step 3: grab input values from textbox and put in local storage ✔️
//Step 4: pull from local storage and put into search history buttons ✔️
//Step 5: create add event listener for search history buttons 
//Step 6: add API ✔️
//Step 7: create fetch request for data and put on page 
//Step 8: unhide 5-day forecast cards when api is pulled
//Step 9: get moment cdn for html, use moment to get weather date
//api key
var APIKey = "789d6254dc04a55a39b161980f745319";


//Variables:
var searchCityEl = document.querySelector("#search-city");
var searchBtn = document.querySelector("#search-button");
var userFormEl = document.querySelector("#user-form");
var dateEL = document.querySelector(".card-title");
var historyContainerEl = document.querySelector("#history");
var weatherHeaderEl = document.querySelector("#weather-header");
var tempEl = document.querySelector("#current-temp");
var windEl = document.querySelector("#current-wind");
var humidityEl = document.querySelector("#current-humidity");
var uvIndexEl = document.querySelector("#current-index");

//function to put text from textarea into local storage
function searchInput() {
    var search = document.getElementById("search-city").value; //getting input value from search-city
    var citiesToSave = []; //blank array
    if (localStorage.getItem("search-city")) { //getting search-city info from ls
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
            button.innerHTML = previousSearchedCities[previousSearchedCities.length - i - 1];//pulling text from local storage and putting it on buttons, only saves most recent 5 searched cities.
            historyDiv.appendChild(button); //appending button to history div
        }
    }

}

displaySearchHistory();

//api search/display
function displayWeather(event) {
    event.preventDefault();
    var cityName = searchCityEl.value
    var currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`;

    fetch(currentWeatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (currentData) {
            console.log(currentData);
            var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${APIKey}&units=imperial` //using dot notation to pull from api data, current data is all of the info that populates in the console log.

            fetch(fiveDayUrl)
                .then(function(response){
                    return response.json();
                })
                .then(function(fiveDayData) {
                    console.log(fiveDayData);
                    var iconImg = document.createElement("img"); //creating img element in html for weather icon
                    var currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY"); //unix parses data from total number of seconds to regular date format.
                    iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`);//gets icon from data
                    weatherHeaderEl.innerHTML=currentData.name + " " + currentDate; //puts city name into weather header
                    tempEl.textContent = currentData.main.temp + "F"; //pulls temp from data and puts onto the page
                    weatherHeaderEl.appendChild(iconImg); //appends icon image to weather header
                    windEl.textContent = currentData.wind.speed + "mph"; //pulls wind from data and puts onto the page
                    humidityEl.textContent = currentData.main.humidity + "%";

                })
        })
}

userFormEl.addEventListener("submit", displayWeather);