import { getCurrentDate } from "./dateFormat.js";
import { toFahrenheit } from "./temperatureControls.js";

let date = document.querySelector("#current-date");
date.innerHTML = getCurrentDate();
let temperature = document.getElementById("temperature");
let temperatureInCelsius = temperature.innerHTML;
let currentCity = document.getElementById("currentCity");
let humidity = document.getElementById("humidity");
let atmosphere = document.getElementById("atmosphere");
let windSpeed = document.querySelector("#windSpeed");
let answer = document.getElementById("answer");
let celsius = document.querySelector("#celsius");
let fahrenheit = document.querySelector("#fahrenheit");
let form = document.querySelector("#search");
let button = document.querySelector("#current");
let apiKey = "d37ed2899e060781baede29f71370db4";

celsius.addEventListener("click", (event) => {
  event.preventDefault();
  temperature.innerHTML = temperatureInCelsius;
});

fahrenheit.addEventListener("click", (event) => {
  event.preventDefault();
  temperature.innerHTML = toFahrenheit(temperature.innerHTML).toString();
});

function searchCity(event) {
  event.preventDefault();
  let city = document.getElementById("city").value.toLowerCase() || null;
  search(city);
}

function search(city) {
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then((response) => {
    let weather = response.data;
    if (weather.name.toLowerCase() === city.toLowerCase()) {
      temperature.innerHTML = `${Math.floor(weather.main.temp)}`;
      temperatureInCelsius = temperature.innerHTML;
      currentCity.innerHTML = `${weather.name}`;
      humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;
      windSpeed.innerHTML = `Wind: ${Math.round(weather.wind.speed)} km/h`;
      atmosphere.innerHTML = `${weather.weather[0].description}`;
    } else {
      answer.innerHTML = `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`;
    }
  });
}

function searchLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let urlGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(urlGeo).then((response) => {
      let weather = response.data;
      if (weather) {
        temperature.innerHTML = `${Math.floor(weather.main.temp)}`;
        temperatureInCelsius = temperature.innerHTML;
        currentCity.innerHTML = `${weather.name}`;
        humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;
        windSpeed.innerHTML = `Wind: ${Math.round(weather.wind.speed)} km/h`;
        atmosphere.innerHTML = `${weather.weather[0].description}`;
      } else {
        answer.innerHTML = `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`;
      }
    });
  });
}

form.addEventListener("submit", searchCity);
button.addEventListener("click", searchLocation);
search("Paris");
