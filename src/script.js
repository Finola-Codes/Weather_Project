// --- Weather Search ---

// Convert Weather
function convertToFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  // Add active link
  celciusConversion.classList.add("active");
  fahrenheitConversion.classList.remove("active");
  tempElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celciusConversion.classList.remove("active");
  fahrenheitConversion.classList.add("active");
  tempElement.innerHTML = Math.round(celciusTemperature);
}

// Activate links to convert weather
let celciusConversion = document.querySelector("#fahrenheit-link");
celciusConversion.addEventListener("click", convertToFahrenheit);

let fahrenheitConversion = document.querySelector("#celcius-link");
fahrenheitConversion.addEventListener("click", convertToCelcius);

// Show Response from Weather API

function showTemp(response) {
  console.log(response);
  // Identify Celcius Temp
  celciusTemperature = Math.round(response.data.main.temp);
  // Locate Metric
  let currentTemperature = Math.round(celciusTemperature);
  // Identify Element to Change
  let currentTemperatureElement = document.querySelector("#temp");
  // Change Element to Metric
  currentTemperatureElement.innerHTML = currentTemperature;
  // Change Country and City in HTML
  let city = response.data.name;
  let country = response.data.sys.country;
  let locationElement = document.querySelector("#searched-city");
  locationElement.innerHTML = `${city}, ${country}`;
  // Change Weather Details
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(
    "#wind-speed"
  ).innerHTML = `${response.data.wind.speed} mph`;

  // Change Weather Description
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  if (currentTemperature <= 0) {
    weatherDescriptionElement.innerHTML =
      "It's very cold out there. Wrap up warm!";
  } else if (currentTemperature >= 10 === currentTemperature <= 19) {
    weatherDescriptionElement.innerHTML = "Maybe put on a jumper.";
  } else if (currentTemperature > 19) {
    weatherDescriptionElement.innerHTML =
      "It's a lovely warm day. <br /> Get outside and enjoy it!";
  }

  getForecast(response.data.coord);
}

// Retrieve Weather Forecast Data from Lon & Lat

function getForecast(coordinates) {
  let apiKey = "e0501d649ccc6a45061d0e391199d05c";
  let unit = "metric";
  let apiForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unit=${unit}`;
  console.log(apiForecastURL);
}

// Display Weather Forecast Data

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["thu", "fri", "sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2">
          <div class="weather-forecast-day"> ${day} </div>
         <img src="" alt="" width="34" class="forecast-img">
         <div class="weather-forecast-temps">
      <span class="weather-forecast-temp-max">
      21°</span>
      <span class="weather-forecast-temp-min">
      16°
      </span>
        </div>
        </div>
      </div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}

// Request Weather Details
function getWeather(city) {
  let apiKey = "e0501d649ccc6a45061d0e391199d05c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

// Identify Value Searched & Submit

function findCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  let city = document.querySelector("#searched-city");
  city.innerHTML = citySearch.value;
  getWeather(citySearch.value);
}

// Identify Form & Link to Function
let form = document.querySelector("#search-form");
form.addEventListener("submit", findCity);

// --- Geolocation Button ---

// Request Current City Weather Details

// Change HTML to Current City

// Get Coordinates
function changeLocation(position) {
  // Identify Location
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  // Get Temp from Coords
  let apiKey = "e0501d649ccc6a45061d0e391199d05c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);

  // Link to Show Temp function
  axios.get(apiUrl).then(showTemp);
}

//
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(changeLocation);
}

// Identify Current Location Button
let currentLocationBtn = document.querySelector("#your-location-button");
currentLocationBtn.addEventListener("click", getPosition);

// --- Current Date and Time ---

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Retrieve Dates and Times
  let dayIndex = now.getDay();
  let monthIndex = now.getMonth();
  let date = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[dayIndex]}, ${months[monthIndex]} ${date}, ${hour}:${minutes}`;
}

// Request Dates and Times
let currentTime = new Date();

// Identify HTML to Change
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(currentTime);

// Call current weather for celcius / fahrenheit conversions
let celciusTemperature = null;
getWeather();

displayForecast();
