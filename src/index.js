function cityWeather(response) {
  let temperatureElement = document.querySelector("weather-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let windSpeedElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = response.data.speed.wind;
  iconElement.innerHTML = `<img src ="${response.data.conditon.icon_url}/>`;

  freshForecast(response.data.city);
}
function dateFormat(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours;
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "a134o76ctfb4c467b6101566d6a54944";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(cityWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return days[date.getDay()];
}
function freshForecast(city) {
  let apiKey = "a134o76ctfb4c467b6101566d6a54944";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Paris");
