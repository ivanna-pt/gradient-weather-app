let apiKey = "343d33d71141f1623d91c8c8aab91982";
let cityInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector(".location-btn");
let mainIcon = document.querySelector("#weather-img");
let forecastIcons = document.querySelectorAll(".week-list img");
let celsiusTemp = null;
let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let celsiusBtn = document.querySelector("#celsius-btn");
// let fahrenheitTemp = (celsiusTemp * 9) / 5 - 32;
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


let showCity = function (city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayNewRequest);
}

showCity("Kyiv");

function displayNewRequest(response){
    console.log(response);
    let newRequest = new Request(response);
    console.log(newRequest);
    newRequest.displayWeather();
    newRequest.changeIcon(mainIcon);
    celsiusTemp = newRequest.temperature;
    console.log(celsiusTemp);
    // console.log(fahrenheitTemp);
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
}

function getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(showPosition);
    document.querySelector("#search-input").value = "";
}

function displayFahrenheitTemp(event){
    let temperatureElement = document.querySelector(".weather-temp");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°";
    fahrenheitBtn.classList.toggle("selected");
    celsiusBtn.classList.toggle("selected");
};

function displayCelsiusTemp (event){
    let temperatureElement = document.querySelector(".weather-temp");
    temperatureElement.innerHTML = Math.round(celsiusTemp) + "°";
    fahrenheitBtn.classList.toggle("selected");
    celsiusBtn.classList.toggle("selected");
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
        this.fahrenheit = (value.data.main.temp * 9)/5 - 32;
    };

    displayWeather() {
        console.log(this.city);
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
        console.log(icon);

        if (icon == undefined){
            img.setAttribute("src", attributeValue + "50n.png");
        } else{
            img.setAttribute("src", attributeValue + icon.iconOff);
        }
    };

}

