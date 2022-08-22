let newRequest;


function test(response){
    console.log(response.data);
}

function searchCity(city){
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(test);

}

searchCity("Madrid");

function handleSubmit(event){
    let city = document.querySelector("#search-input").value;

    newRequest = new Request(city);
    newRequest.getWeather(apiKey);
    console.log(newRequest);
}

searchBtn.addEventListener("click", handleSubmit);
cityInput.addEventListener("keydown", function (e){
    if (e.code == "Enter") handleSubmit();
})

class Request {
    constructor(value) {
        this.city = value;
        // this.temperature = 0;
        // this.description = "";
        // this.humidity = 0;
    }

    getWeather(key) {
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${key}&units=metric`;

        axios.get(apiUrl).then(this.displayWeather);
    }

    displayWeather(response) {
        console.log(response);
        document.querySelector("#city").innerHTML = response.data.name;
        document.querySelector(".weather-temp").innerHTML = Math.round(response.data.main.temp) + "°";
        document.querySelector(".weather-desc").innerHTML = response.data.weather[0].main;
        document.querySelector("#wind").innerHTML = response.data.wind.speed;
        document.querySelector("#humidity").innerHTML = response.data.main.humidity;
        document.querySelector("#cloudiness").innerHTML = response.data.clouds.all;

    }

}