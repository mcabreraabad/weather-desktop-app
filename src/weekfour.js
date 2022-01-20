//to get current time and date
let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];
  let date = now.getDate();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day}, ${month} ${date} <br> ${hours}:${minutes}`;
}
//to change the HTML to current date
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate();

//lets user submit city, changes HTML, uses input as city name to call API. everything inside 1 function. then axios calls temperature
function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let newCity = document.querySelector("#city-input");
  newCity.innerHTML = `${searchInput.value}`;
  let cityName = `${searchInput.value}`;
  let apiKey = `028e3762e7583bcb74c806d9092e5ad4`;
  let units = "imperial";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(weatherApi).then(getdata);
}
//gets temp and sky description from city entered and changes HTML
function getdata(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current");
  currentTemp.innerHTML = `${temp}`;
  let weatherDescription = `${response.data.weather[0].description}`;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = weatherDescription;
}
//form listens for city input
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", enterCity);

//get geolocation when click on current button
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//gets location from API then says to fetch weather of that location
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "imperial";
  let apiKey = "028e3762e7583bcb74c806d9092e5ad4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(getCurrentWeather);
}
//gets data and changes HTML to "current" city info
function getCurrentWeather(response) {
  let currentCity = response.data.name;
  let changeToCurrentCity = document.querySelector("#city-input");
  changeToCurrentCity.innerHTML = currentCity;
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".current");
  currentTemp.innerHTML = `${temp}`;
  let weatherDescription = `${response.data.weather[0].description}`;
  let currentDescription = document.querySelector("#weather-description");
  currentDescription.innerHTML = weatherDescription;
  console.log(response);
}
//event listener on click current button
let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getLocation);

function changeF(event) {
  let farenheit = document.querySelector(".current");
  farenheit.innerHTML = "75";
  //do math round and coversion equa later.also want temp to be a number not a string
}

let farenheitLink = document.querySelector("#faren");
farenheitLink.addEventListener("click", changeF);

function changeC(event) {
  let celcius = document.querySelector(".current");
  celcius.innerHTML = "28";
  //let clickC = document.querySelector("#celc");
  //clickC.innerHTML = <strong>°C</strong>;
}

let celciusLink = document.querySelector("#celc");
celciusLink.addEventListener("click", changeC);
