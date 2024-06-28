// Get current weather in Charlotte

async function getCurrentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=fb3852c09f6447cfbb4174232242606&q=${location}`, 
    {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(getWeatherInfo)
    .catch(function(error) {
        console.log(`ERROR: ${error}`)
    });
}

getCurrentWeather('charlotte');
function getWeatherInfo(response) {
    console.log(response.current);
    const weatherInfo = {
        condition: response.current.condition.text,
        tempF: response.current.temp_f,
        tempC: response.current.temp_c,
        feelsLikeF: response.current.feelslike_f,
        feelsLikeC: response.current.feelslike_c,
        humidity: response.current.humidity,
    };
    console.log(weatherInfo);
}