async function fetchWeather() {
    let location = document.getElementById('location').value;
    const apiKey = '71b168c570a8fa5ef0120b96cb5b8d20'; 
    
    if (!location) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                await getWeather(apiUrl);
            }, () => {
                document.getElementById('weather-data').innerHTML = `<p>Unable to retrieve your location</p>`;
            });
        } else {
            document.getElementById('weather-data').innerHTML = `<p>Geolocation is not supported by this browser</p>`;
        }
    } else {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        await getWeather(apiUrl);
    }
}

async function getWeather(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        document.getElementById('weather-data').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherData = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weather-data').innerHTML = weatherData;
}
