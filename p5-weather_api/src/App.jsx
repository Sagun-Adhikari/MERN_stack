
import { useState } from "react";
import "./App.css";

function App() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    async function getWeather() {
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            alert("City not found");
            return;
        }

        const location = locationData.results[0];

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const data = await response.json();

        setWeather({
            city: location.name,
            temperature: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            wind: data.current.wind_speed_10m
        });
    }

    return (
        <div className="app">
            <h1>Weather App</h1>

            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={function (event) {
                    setCity(event.target.value);
                }}
            />

            <button onClick={getWeather}>Search</button>

            {weather && (
                <div className="weather-card">
                    <h2>{weather.city}</h2>
                    <h1>{weather.temperature}°C</h1>
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Wind Speed: {weather.wind} km/h</p>
                </div>
            )}
        </div>
    );
}

export default App;
