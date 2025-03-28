async function getWeather() {
    const city = document.getElementById('city').value;
    const result = document.getElementById('weather-result');
    result.innerHTML = 'Loading...';

    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = 'City not found!';
            return;
        }

        const { latitude, longitude } = geoData.results[0];
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherResponse.json();

        const { temperature, windspeed, weathercode } = weatherData.current_weather;
        result.innerHTML = `Temperature: ${temperature}°C | Wind Speed: ${windspeed} km/h | Weather Code: ${weathercode}`;
    } catch (error) {
        result.innerHTML = 'Error fetching data!';
    }
}
