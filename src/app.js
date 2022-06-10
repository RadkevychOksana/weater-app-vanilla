// Current date
function formatDate(timestemp) {
  let date = new Date(timestemp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hour}:${minutes}`;
}

// Current Temperature
function showTemp(response) {
  let temp = document.getElementById("temp");
  temp.innerHTML = Math.round(response.data.main.temp);
  let city = document.getElementById("city");
  city.innerHTML = response.data.name;
  let description = document.getElementById("description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.getElementById("humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.getElementById("windSpeed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let date = document.getElementById("date");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.getElementById("icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  celsiusTemp = response.data.main.temp;
}

function search(cityName) {
  // Api Request
  let apiKey = "149e1223e69e53cd644a15607bc75a82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

// search
function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.getElementById("city-input");
  search(cityInput.value);
}

let form = document.getElementById("search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenhaitTemp(event) {
  event.preventDefault();
  let temp = document.getElementById("temp");
  let showFahrenhaitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(showFahrenhaitTemp);
  // remove active class
  celsiusLink.classList.remove("link-secondary");
  fahrenheitLink.classList.add("link-secondary");
}

let fahrenheitLink = document.getElementById("fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenhaitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.getElementById("temp");
  temp.innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("link-secondary");
  fahrenheitLink.classList.remove("link-secondary");
}

let celsiusTemp = null;
let celsiusLink = document.getElementById("celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// add HTML forecast days
function addForecastDay() {
  let forecastDay = document.getElementById("forecast-day");
  let forecastHtml = `<div class="row">`;
  let daysShort = ["Sun", "Mon", "Tues", "Wed", "Thu"];
  daysShort.forEach(addColumns);
  function addColumns(day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="col-2">
                <div class="weather-app-forecast-day">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/04n@2x.png"
                  alt="#"
                  width="50px"
                />
                <div class="weather-app-forecast-temp">
                  <span class="weather-app-forecast-temp-max fw-bold"> 27°&nbsp-</span>
                  </span>
                  <span class="weather-app-forecast-temp-min">17°</span>
                </div>
              </div>
  `;
  }
  forecastHtml = forecastHtml + `</div>`;
  forecastDay.innerHTML = forecastHtml;
}
addForecastDay();
