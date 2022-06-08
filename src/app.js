let apiKey = "149e1223e69e53cd644a15607bc75a82";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
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
}
axios.get(apiUrl).then(showTemp);
