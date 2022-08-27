let apiKey = "343d33d71141f1623d91c8c8aab91982";
let cityInput = document.querySelector("#search-input");
let searchBtn = document.querySelector("#search-btn");
let currentBtn = document.querySelector(".location-btn");
let mainIcon = document.querySelector("#weather-img");
let forecast = document.querySelector("#forecast");
let celsiusTemp = null;
let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
let celsiusBtn = document.querySelector("#celsius-btn");
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
        let icon = findIcon(item.weather[0].id);
        image.style.backgroundImage = `url("/img/${icon}d.png")`;


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

function findIcon(value){
    let icon = "";

    switch (true){
        case (value == 800):
            icon += "01";
            break;
        case (value == 801):
            icon += "02";
            break;
        case (value == 802):
            icon = "03";
            break;
        case (value == 803 || value == 804):
            icon += "04";
            break;
        case (value > 199 && value < 300):
            icon += "11";
            break;
        case (value > 299 && value < 400):
            icon += "09";
            break;
        case (value > 499 && value < 511):
            icon += "10";
            break;
        case (value == 511):
            icon += "13";
            break;
        case (value > 519 && value < 600):
            icon += "09";
            break;
        case (value > 599 && value < 700):
            icon += "13";
            break;
        case (value > 700 && value < 800):
            icon += "50";
            break;
        default:
            icon += "01";
    }
    return icon;
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
        this.iconID = value.data.weather[0].id;
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
        console.log(findIcon(this.iconID));
        let icon = findIcon(this.iconID);
        let attributeValue = `img/${icon}n.png`;
        img.setAttribute("src", attributeValue);
    };
}

showCity("Kyiv");




