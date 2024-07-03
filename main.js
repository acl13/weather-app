const userLocation = document.getElementById('user-location')
const submit = document.getElementById('submit');

submit.addEventListener('click', () => {
    getWeather(userLocation.value).catch(handleError);
})

async function getWeather(location) {
    const apiFetch = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fb3852c09f6447cfbb4174232242606&q=${location}&days=4`, 
    {mode: 'cors'});
    const weatherData = await apiFetch.json();
    console.log(weatherData);
    const relevantWeatherData = await getWeatherInfo(weatherData); 
    console.log(relevantWeatherData);
    updateUI(relevantWeatherData);
}   

getWeather('Charlotte').catch(handleError);

function getWeatherInfo(response) {
    const weather = {
        location: response.location.name,
        currentCondition: response.current.condition.text,
        currentImage: response.current.condition.icon,
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
        todayRain: response.forecast.forecastday[0].day.daily_chance_of_rain,
        todaySunrise: response.forecast.forecastday[0].astro.sunrise, 
        todaySunset: response.forecast.forecastday[0].astro.sunset,
        tomorrowCondition: response.forecast.forecastday[1].day.condition.text,
        tomorrowHighTempF: response.forecast.forecastday[1].day.maxtemp_f,
        tomorrowHighTempC: response.forecast.forecastday[1].day.maxtemp_c,
        tomorrowLowTempF: response.forecast.forecastday[1].day.mintemp_f,
        tomorrowLowTempC: response.forecast.forecastday[1].day.mintemp_c,
        tomorrowHumidity: response.forecast.forecastday[1].day.avghumidity,
        tomorrowRain: response.forecast.forecastday[1].day.daily_chance_of_rain,
        tomorrowSunrise: response.forecast.forecastday[1].astro.sunrise,
        dayTwoCondition: response.forecast.forecastday[2].day.condition.text,
        dayTwoHighTempF: response.forecast.forecastday[2].day.maxtemp_f,
        dayTwoHighTempC: response.forecast.forecastday[2].day.maxtemp_c,
        dayTwoLowTempF: response.forecast.forecastday[2].day.mintemp_f,
        dayTwoLowTempC: response.forecast.forecastday[2].day.mintemp_c,
        dayTwoHumidity: response.forecast.forecastday[2].day.avghumidity,
        dayTwoRain: response.forecast.forecastday[2].day.daily_chance_of_rain,
        dayThreeCondition: response.forecast.forecastday[3].day.condition.text,
        dayThreeHighTempF: response.forecast.forecastday[3].day.maxtemp_f,
        dayThreeHighTempC: response.forecast.forecastday[3].day.maxtemp_c,
        dayThreeLowTempF: response.forecast.forecastday[3].day.mintemp_f,
        dayThreeLowTempC: response.forecast.forecastday[3].day.mintemp_c,
        dayThreeHumidity: response.forecast.forecastday[3].day.avghumidity,
        dayThreeRain: response.forecast.forecastday[3].day.daily_chance_of_rain
    }
    return weather;
}

function handleError(error) {
    console.log(`ERROR: ${error}`);
}

// UPDATE UI

function updateUI(data) {
// Current weather 
const currentLocation = document.getElementById('current-location');
const currentTemp = document.getElementById('current-temp');
const currentCondition = document.getElementById('current-condition');
const currentHighTemp = document.getElementById('current-high');
const currentLowTemp = document.getElementById('current-low');
currentLocation.textContent = data.location;
currentTemp.textContent = `${Math.round(data.currentTempF)}\u00B0`;
currentCondition.textContent = data.currentCondition;
currentHighTemp.textContent = `H: ${Math.round(data.todayHighTempF)}\u00B0`;
currentLowTemp.textContent = `L: ${Math.round(data.todayLowTempF)}\u00B0`;

// Days of week     
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const date = new Date();
const tomorrow = document.getElementById('tomorrow');
const dayTwo = document.getElementById('day-two');
const dayThree = document.getElementById('day-three');
tomorrow.textContent = days[date.getDay() + 1];
dayTwo.textContent = days[date.getDay() + 2];
dayThree.textContent = days[date.getDay() + 3];

// Condition icon & chance of rain
const todayIcon = document.getElementById('today-icon');
const tomorrowIcon = document.getElementById('tomorrow-icon');
const dayTwoIcon = document.getElementById('day-two-icon');
const dayThreeIcon = document.getElementById('day-three-icon');
todayIcon.textContent = getIcon(data.todayCondition);
tomorrowIcon.textContent = getIcon(data.tomorrowCondition);
dayTwoIcon.textContent = getIcon(data.dayTwoCondition);
dayThreeIcon.textContent = getIcon(data.dayThreeCondition);
displayRainChance(data);  

// Low and High Temps, Humidity & Feels Like, Sunrise & Sunset Times
const todayLow = document.getElementById('today-low');
const todayHigh = document.getElementById('today-high');
const tomorrowLow = document.getElementById('tomorrow-low');
const tomorrowHigh = document.getElementById('tomorrow-high');
const dayTwoLow = document.getElementById('day-two-low');
const dayTwoHigh = document.getElementById('day-two-high');
const dayThreeLow = document.getElementById('day-three-low');
const dayThreeHigh = document.getElementById('day-three-high');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');
todayLow.textContent = `Low: ${Math.round(data.todayLowTempF)}`;
todayHigh.textContent = `High: ${Math.round(data.todayHighTempF)}`;
tomorrowLow.textContent = `Low: ${Math.round(data.tomorrowLowTempF)}`;
tomorrowHigh.textContent = `High: ${Math.round(data.tomorrowHighTempF)}`;
dayTwoLow.textContent = `Low: ${Math.round(data.dayTwoLowTempF)}`;
dayTwoHigh.textContent = `High: ${Math.round(data.dayTwoHighTempF)}`;
dayThreeLow.textContent = `Low: ${Math.round(data.dayThreeLowTempF)}`;
dayThreeHigh.textContent = `High: ${Math.round(data.dayThreeHighTempF)}`;
humidity.textContent = `${data.currentHumidity}%`;
feelsLike.textContent = `${Math.round(data.currentFeelsLikeF)}\u00B0`;
displaySunriseSunset(data);
}


function getIcon(condition) {
    let icon; 
    if (condition === 'Sunny') {
        icon = '☀️';
        return icon;
    } else if (condition === 'Cloudy') {
        icon = '☁️';
        return icon;
    } else if (/rain/i.test(condition)) {
        icon = '🌧️';
        return icon;
    } else if (/storm/i.test(condition)) {
        icon = '🌩️';
        return icon;
    } else if (/snow/i.test(condition)) {
        icon = '🌨️';
        return icon; 
    }  else if (/wind/i.test(condition)) {
        icon = '💨';
        return icon; 
    } else {
        icon = '🌤️';
        return icon; 
    }
}

function displayRainChance(data) {
const todayRainChance = document.getElementById('today-rain-chance');
const tomorrowRainChance = document.getElementById('tomorrow-rain-chance');
const dayTwoRainChance = document.getElementById('day-two-rain-chance');
const dayThreeRainChance = document.getElementById('day-three-rain-chance');
    if (data.todayRain === 0) {
        todayRainChance.textContent = '';
    } else {
        todayRainChance.textContent = `${data.todayRain}%`;
    }
    
    if (data.tomorrowRain === 0) {
        tomorrowRainChance.textContent = '';
    } else {
        tomorrowRainChance.textContent = `${data.tomorrowRain}%`;
    }
    
    if (data.dayTwoRain === 0) {
        dayTwoRainChance.textContent = '';
    } else {
        dayTwoRainChance.textContent = `${data.dayTwoRain}%`;
    }
    
    if (data.dayThreeRain === 0) {
        dayThreeRainChance.textContent = '';
    } else {
        dayThreeRainChance.textContent = `${data.dayThreeRain}%`;
    }
}

function getTwoDigitMinutes(currentMinutes) {
    if (currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
        return currentMinutes;
    }
}

function displaySunriseSunset(data) {
const sunriseHour = +data.todaySunrise.slice(0, 2);
const sunsetHourMilitary = +data.todaySunset.slice(0, 2) + 12;
const current = new Date();
const currentHour = current.getHours();
const riseOrSet = document.getElementById('rise-or-set');
const riseOrSetTime = document.getElementById('rise-or-set-time');

if (currentHour <= sunriseHour) {
    riseOrSet.textContent = 'Sunrise';
    riseOrSetTime.textContent = data.todaySunrise;
} else if (currentHour > sunriseHour && currentHour <= sunsetHourMilitary) {
    riseOrSet.textContent = 'Sunset';
    riseOrSetTime.textContent = data.todaySunset;
} else if (currentHour > sunsetHourMilitary) {
    riseOrSet.textContent = 'Sunrise';
    riseOrSetTime = data.tomorrowSunrise;
}
}