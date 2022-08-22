let apiKey = "343d33d71141f1623d91c8c8aab91982";
let cityInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");

function displayWeather(response) {
    console.log(response.data);
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".weather-temp").innerHTML = Math.round(response.data.main.temp) + "°";
    document.querySelector(".weather-desc").innerHTML = response.data.weather[0].main;
    document.querySelector("#wind").innerHTML = response.data.wind.speed;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#cloudiness").innerHTML = response.data.clouds.all;
    let image = document.querySelector("#weather-img");
    let attributeValue = `img/${response.data.weather[0].icon}.png`
    image.setAttribute("src", attributeValue);
}

function searchCity (city){
    let apiKey = "343d33d71141f1623d91c8c8aab91982";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = apiEndPoint + "q=" + city + "&appid=" + apiKey + "&units=metric";
    axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(){
    let city = document.querySelector("#search-input").value;
    searchCity(city);
}

searchBtn.addEventListener("click", handleSubmit);
cityInput.addEventListener("keydown", function (e){
    if (e.code == "Enter") handleSubmit();
})

//Weather API Current Location
function showPosition(position){
    let apiKey = "343d33d71141f1623d91c8c8aab91982";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = apiEndPoint + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
    axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector("#search-input").value = "";
}

let currentBtn = document.querySelector(".location-btn");
currentBtn.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");




