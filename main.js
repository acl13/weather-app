async function getWeather(location) {
    const apiFetch = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fb3852c09f6447cfbb4174232242606&q=${location}&days=4`, 
    {mode: 'cors'});
    const weatherData = await apiFetch.json();
    console.log(weatherData);
    const relevantWeatherData = await getWeatherInfo(weatherData); 
    console.log(relevantWeatherData); 
}

getWeather('Charlotte').catch(error => {
    console.log(`ERROR: ${error}`);
});


function getWeatherInfo(response) {
    const weather = {
        currentCondition: response.current.condition.text,
        currentTempF: response.current.temp_f,
        currentTempC: response.current.temp_c,
        currentFeelsLikeF: response.current.feelslike_f,
        currentFeelsLikeC: response.current.feelslike_c,
        currentHumidity: response.current.humidity,
        todayCondition: response.forecast.forecastday[0].day.condition.text,
        todayHighTempF: response.forecast.forecastday[0].day.maxtemp_f,
        todayHighTempC: response.forecast.forecastday[0].day.maxtemp_c,
        todayLowTempF: response.forecast.forecastday[0].day.mintemp_f,
        todayLowTempC: response.forecast.forecastday[0].day.mintemp_c,
        todayHumidity: response.forecast.forecastday[0].day.avghumidity,
        todayRainChance: response.forecast.forecastday[0].day.daily_chance_of_rain, 
        tomorrowCondition: response.forecast.forecastday[1].day.condition.text,
        tomorrowHighTempF: response.forecast.forecastday[1].day.maxtemp_f,
        tomorrowHighTempC: response.forecast.forecastday[1].day.maxtemp_c,
        tomorrowLowTempF: response.forecast.forecastday[1].day.mintemp_f,
        tomorrowLowTempC: response.forecast.forecastday[1].day.mintemp_c,
        tomorrowHumidity: response.forecast.forecastday[1].day.avghumidity,
        tomorrowRainChance: response.forecast.forecastday[1].day.daily_chance_of_rain,
        dayTwoCondition: response.forecast.forecastday[2].day.condition.text,
        dayTwoHighTempF: response.forecast.forecastday[2].day.maxtemp_f,
        dayTwoHighTempC: response.forecast.forecastday[2].day.maxtemp_c,
        dayTwoLowTempF: response.forecast.forecastday[2].day.mintemp_f,
        dayTwoLowTempC: response.forecast.forecastday[2].day.mintemp_c,
        dayTwoHumidity: response.forecast.forecastday[2].day.avghumidity,
        dayTwoRainChance: response.forecast.forecastday[2].day.daily_chance_of_rain,
        dayThreeCondition: response.forecast.forecastday[3].day.condition.text,
        dayThreeHighTempF: response.forecast.forecastday[3].day.maxtemp_f,
        dayThreeHighTempC: response.forecast.forecastday[3].day.maxtemp_c,
        dayThreeLowTempF: response.forecast.forecastday[3].day.mintemp_f,
        dayThreeLowTempC: response.forecast.forecastday[3].day.mintemp_c,
        dayThreeHumidity: response.forecast.forecastday[3].day.avghumidity,
        dayThreeRainChance: response.forecast.forecastday[3].day.daily_chance_of_rain
    }
    return weather;
}

// function updateUI(data) {
//     const currentCondition = document.getElementById('condition');
//     currentCondition.textContent = data.dayTwoRainChance;
// }