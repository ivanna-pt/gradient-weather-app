let apiKey = "343d33d71141f1623d91c8c8aab91982";
let cityInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector(".location-btn");
let mainIcon = document.querySelector("#weather-img");
let forecast = document.querySelector("#forecast");
let celsiusTemp = null;
let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let celsiusBtn = document.querySelector("#celsius-btn");
let iconArr = [
    {
        description: "clear sky",
        iconOn: "01d.png",
        iconOff: "01n.png",
    },
    {
        description: "few clouds",
        iconOn: "02d.png",
        iconOff: "02n.png",
    },
    {
        description: "scattered clouds",
        iconOn: "03d.png",
        iconOff: "03n.png",
    },
    {
        description: "broken clouds",
        iconOn: "04d.png",
        iconOff: "04n.png",
    },
    {
        description: "shower rain",
        iconOn: "09d.png",
        iconOff: "09n.png",
    },
    {
        description: "rain",
        iconOn: "10d.png",
        iconOff: "10n.png",
    },
    {
        description: "thunderstorm",
        iconOn: "11d.png",
        iconOff: "11n.png",
    },
    {
        description: "snow",
        iconOn: "13d.png",
        iconOff: "13n.png",
    },
    {
        description: "mist",
        iconOn: "50d.png",
        iconOff: "50n.png",
    }
];
let forecastArr = [];

function showCity (city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayNewRequest);
}

function displayNewRequest(response){
    console.log(forecast);
    forecast.innerHTML = "";
    forecastArr = [];
    console.log(response.data);
    let newRequest = new Request(response);
    console.log(newRequest);
    newRequest.displayWeather();
    newRequest.changeIcon(mainIcon);
    getForecast(response.data.coord.lat, response.data.coord.lon);
    celsiusTemp = newRequest.temperature;
    console.log(forecastArr);
};

function handleSubmit(event){
    let city = document.querySelector("#search-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayNewRequest);
    document.querySelector("#search-input").value = "";
}

function showPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayNewRequest);
    forecast.innerHTML = "";
}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector("#search-input").value = "";
}

function displayFahrenheitTemp(event){
    let temperatureElement = document.querySelector(".weather-temp");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°";
    fahrenheitBtn.classList.add("selected");
    celsiusBtn.classList.remove("selected");
};

function displayCelsiusTemp (event){
    let temperatureElement = document.querySelector(".weather-temp");
    temperatureElement.innerHTML = Math.round(celsiusTemp) + "°";
    fahrenheitBtn.classList.remove("selected");
    celsiusBtn.classList.add("selected");
}

function getForecast(latitude, longitude){
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(response => {
        console.log(response.data.daily);
        let tempArr = response.data.daily;
        for (let i = 1; i < 5; i++){
            forecastArr.push(tempArr[i]);
        };
        displayForecast(forecastArr);
    });
}

function displayForecast(arr){

    arr.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("week-item");

        let image = document.createElement("div");
        image.classList.add("day-img");

        let weekDay = document.createElement("div");
        weekDay.classList.add("day-name");
        let unixTimestamp = item.dt;
        let date = new Date(unixTimestamp * 1000);
        let dayName = date.toLocaleDateString("en-GB", {weekday: "short"});
        weekDay.innerText = dayName;

        let weekDayTemp = document.createElement("div");
        weekDayTemp.classList.add("day-temp");
        weekDayTemp.innerHTML = `<span>${Math.round(item.temp.day)}</span>°C`;

        li.append(image);
        li.append(weekDay);
        li.append(weekDayTemp);
        forecast.append(li);
    })
}



searchBtn.addEventListener("click", handleSubmit);
cityInput.addEventListener("keydown", function (e){
    if (e.code == "Enter") handleSubmit();
})
currentBtn.addEventListener("click", getCurrentLocation);
fahrenheitBtn.addEventListener("click", displayFahrenheitTemp);
celsiusBtn.addEventListener("click", displayCelsiusTemp);


class Request {
    constructor(value) {
        this.city = value.data.name;
        this.temperature = value.data.main.temp;
        this.description = value.data.weather[0].main;
        this.humidity = value.data.main.humidity;
        this.windspeed = value.data.wind.speed;
        this.cloudiness = value.data.clouds.all;
        this.icon = value.data.weather[0].description;
        this.latitude = value.data.coord.lat;
        this.longitude = value.data.coord.lon;
    };

    displayWeather() {
        document.querySelector("#city").innerHTML = this.city;
        document.querySelector(".weather-temp").innerHTML = Math.round(this.temperature) + "°";
        document.querySelector(".weather-desc").innerHTML = this.description;
        document.querySelector("#wind").innerHTML = Math.round(this.windspeed);
        document.querySelector("#humidity").innerHTML = this.humidity;
        document.querySelector("#cloudiness").innerHTML = this.cloudiness;
    };

    changeIcon (img){
        let attributeValue = "img/";
        let icon = iconArr.find(icon => icon.description === this.icon)

        if (icon == undefined){
            img.setAttribute("src", attributeValue + "50n.png");
        } else{
            img.setAttribute("src", attributeValue + icon.iconOff);
        }
    };
}

showCity("Kyiv");
