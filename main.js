// Get current weather in Charlotte

async function getCurrentWeather(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=fb3852c09f6447cfbb4174232242606&q=${location}`, 
    {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(`ERROR: ${error}`)
    });
}

getCurrentWeather('charlotte');
