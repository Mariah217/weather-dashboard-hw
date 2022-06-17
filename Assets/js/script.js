//Step 1: create static selector variables ✔️
//Step 2: onclick for search button ✔️
//Step 3: grab input values from textbox and put in local storage ✔️
//Step 4: pull from local storage and put into search history buttons ✔️
//Step 5: create add event listener for search history buttons 
//Step 6: add API ✔️
//Step 7: create fetch request for data and put on page ✔️
//Step 8: unhide 5-day forecast cards when api is pulled ✔️
//Step 9: get moment cdn for html, use moment to get weather date ✔️
//Step 10: make website responsive 

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
var date1EL = document.querySelector("#date1");
var dayTwoCardSubtitle = document.querySelector("#icon1");
var temp1El = document.querySelector("#temp1");
var wind1El = document.querySelector("#wind1");
var humidty1El = document.querySelector("#humidity1");
var date2EL = document.querySelector("#date2");
var dayThreeCardSubtitle = document.querySelector("#icon2");
var temp2El = document.querySelector("#temp2");
var wind2El = document.querySelector("#wind2");
var humidty2El = document.querySelector("#humidity2");
var date3EL = document.querySelector("#date3");
var dayFourCardSubtitle = document.querySelector("#icon3");
var temp3El = document.querySelector("#temp3");
var wind3El = document.querySelector("#wind3");
var humidty3El = document.querySelector("#humidity3");
var date4EL = document.querySelector("#date4");
var dayFiveCardSubtitle = document.querySelector("#icon4");
var temp4El = document.querySelector("#temp4");
var wind4El = document.querySelector("#wind4");
var humidty4El = document.querySelector("#humidity4");
var date5EL = document.querySelector("#date5");
var daySixCardSubtitle = document.querySelector("#icon5");
var temp5El = document.querySelector("#temp5");
var wind5El = document.querySelector("#wind5");
var humidty5El = document.querySelector("#humidity5");

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
        var previousSearchedCities = JSON.parse(localStorage.getItem("search-city")); //using parse to convert ls to what it used to be, and getting input info from local storage

        var cityIterationCount = 5;
        if (previousSearchedCities.length <= 5) { //if local storage array is less than or equal to five
            cityIterationCount = previousSearchedCities.length; //change city iteration count to equal however many elements are in the array (1,2,3 etc.)
        }
    }

    for (let i = 0; i < cityIterationCount; i++) { //for loop parameters
        var button = document.createElement('button'); //creating button in html
        var historyDiv = document.getElementById("history");//var for history div in html
        button.innerHTML = previousSearchedCities[previousSearchedCities.length - i - 1];//pulling text from local storage and putting it on buttons, only saves most recent 5 searched cities. 
        historyDiv.appendChild(button); //appending button to history div
    }
}

 displaySearchHistory();

//api search/display
function displayWeather(event) {
    // visibility.classList.remove("invisible");
    event.preventDefault();//prevents page from refreshing

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
                .then(function (response) {
                    return response.json();
                })
                .then(function (fiveDayData) {
                    console.log(fiveDayData);
                    var iconImg = document.createElement("img"); //creating img element in html for weather icon
                    var currentDate = moment.unix(currentData.dt).format("MM/DD/YYYY"); //unix parses data from total number of seconds to regular date format.
                    iconImg.setAttribute("src", `http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`);//gets icon from data
                    weatherHeaderEl.innerHTML = currentData.name + " " + currentDate; //puts city name into weather header
                    tempEl.textContent = currentData.main.temp + "F"; //pulls temp from data and puts onto the page
                    weatherHeaderEl.appendChild(iconImg); //appends icon image to weather header
                    windEl.textContent = currentData.wind.speed + "mph"; //pulls wind from data and puts onto the page
                    humidityEl.textContent = currentData.main.humidity + "%";

                    date1EL.textContent= moment.unix(fiveDayData.daily[1].dt).format("MM/DD/YYYY");
                    date2EL.textContent= moment.unix(fiveDayData.daily[2].dt).format("MM/DD/YYYY");
                    date3EL.textContent= moment.unix(fiveDayData.daily[3].dt).format("MM/DD/YYYY");
                    date4EL.textContent= moment.unix(fiveDayData.daily[4].dt).format("MM/DD/YYYY");
                    date5EL.textContent= moment.unix(fiveDayData.daily[5].dt).format("MM/DD/YYYY");

                    temp1El.textContent = "Temp: " + fiveDayData.daily[1].temp.day + "F";
                    temp2El.textContent = "Temp: " + fiveDayData.daily[2].temp.day + "F";
                    temp3El.textContent = "Temp: " + fiveDayData.daily[3].temp.day + "F";
                    temp4El.textContent = "Temp: " + fiveDayData.daily[4].temp.day + "F";
                    temp5El.textContent = "Temp: " + fiveDayData.daily[5].temp.day + "F";

                    wind1El.textContent = "Wind: " + fiveDayData.daily[1].wind_speed + "mph";
                    wind2El.textContent = "Wind: " + fiveDayData.daily[2].wind_speed + "mph";
                    wind3El.textContent = "Wind: " + fiveDayData.daily[3].wind_speed + "mph";
                    wind4El.textContent = "Wind: " + fiveDayData.daily[4].wind_speed + "mph";
                    wind5El.textContent = "Wind: " + fiveDayData.daily[5].wind_speed + "mph";
            
                    humidty1El.textContent = "Humidity: " + fiveDayData.daily[1].humidity + "%";
                    humidty2El.textContent = "Humidity: " + fiveDayData.daily[2].humidity + "%";
                    humidty3El.textContent = "Humidity: " + fiveDayData.daily[3].humidity + "%";
                    humidty4El.textContent = "Humidity: " + fiveDayData.daily[4].humidity + "%";
                    humidty5El.textContent = "Humidity: " + fiveDayData.daily[5].humidity + "%";

                    //select all the existing weather icons
                    //remove all the previous weather icons

                    var weatherIcons = document.getElementsByClassName("weatherIcons")//array of weather icons
                    for (let i = 0; i < 5; i++) { //looping through each one
                        if (weatherIcons.length!=0 ){
                        weatherIcons[0].remove(); //telling each weather icon to remove itself
                        }
                    }

                    var secondDayWeatherImg = document.createElement("img");
                    secondDayWeatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[1].weather[0].icon}@2x.png`);
                    secondDayWeatherImg.setAttribute("class", "weatherIcons");
                    dayTwoCardSubtitle.appendChild(secondDayWeatherImg);

                    var thirdDayWeatherImg = document.createElement("img");
                    thirdDayWeatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[2].weather[0].icon}@2x.png`);
                    thirdDayWeatherImg.setAttribute("class", "weatherIcons");
                    dayThreeCardSubtitle.appendChild(thirdDayWeatherImg);

                    var fourthDayWeatherImg = document.createElement("img");
                    fourthDayWeatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[3].weather[0].icon}@2x.png`);
                    fourthDayWeatherImg.setAttribute("class", "weatherIcons");
                    dayFourCardSubtitle.appendChild(fourthDayWeatherImg);

                    var fifthDayWeatherImg = document.createElement("img");
                    fifthDayWeatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[4].weather[0].icon}@2x.png`);
                    fifthDayWeatherImg.setAttribute("class", "weatherIcons");
                    dayFiveCardSubtitle.appendChild(fifthDayWeatherImg);

                    var sixthDayWeatherImg = document.createElement("img");
                    sixthDayWeatherImg.setAttribute("src", `http://openweathermap.org/img/wn/${fiveDayData.daily[5].weather[0].icon}@2x.png`);
                    sixthDayWeatherImg.setAttribute("class", "weatherIcons");
                    daySixCardSubtitle.appendChild(sixthDayWeatherImg);
                })
        })
}


userFormEl.addEventListener("submit", displayWeather);
