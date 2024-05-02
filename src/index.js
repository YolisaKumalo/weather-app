function cityWeather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");
  let windSpeedElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = dateFormat(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  timeElement.innerHTML = dateFormat(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  iconElement.innerHTML = `<img src = "${response.data.condition.icon_url}" class="icon"  />`;

  freshForecast(response.data.city);
}
function dateFormat(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "a134o76ctfb4c467b6101566d6a54944";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(cityWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return day[date.getDay()];
}
function freshForecast(city) {
  let apiKey = "a134o76ctfb4c467b6101566d6a54944";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 4) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${dayFormat(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forecast-icon" />
        <div class="forecast-temperatures">
          <span class="forecast-temp-max">
            <strong>${Math.round(day.temperature.maximum)}℃</strong>
          </span>
          <span class="forecast-temp-min">${Math.round(
            day.temperature.minimum
          )}℃</span>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

searchCity("Cape Town");
