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
}

// Api Request
let cityName = "New York";
let apiKey = "149e1223e69e53cd644a15607bc75a82";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemp);
