import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = "c8d0f745f86689e67013086b502c05ea"; // Replace with your OpenWeatherMap API key

  const getWeatherAxios = async () => {
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            units: "metric",
            appid: apiKey,
          },
        }
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("City not found. Please enter a valid city name.");
    }
  };

  return (
    <div className="app-container" >
      <h1>{weather && weather.main ? (
        <div className="main-title">
          
          <h2>
            🌤️ {weather.name}, {weather.sys.country} Weather
          </h2>
          
        </div>
      ) : (
        <p></p>
      )}</h1>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        
      />
      <button onClick={getWeatherAxios}>
        Get Weather
      </button>

      {weather && weather.main ? (
        <div style={{ marginTop: "30px" }}>
          <p>
            🌤️ {weather.weather[0].description}
          </p>
          <p>
            🌡️ {weather.main.temp}°C (from {weather.main.temp_min}°C to{" "}
            {weather.main.temp_max}°C)
          </p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>☁️ Clouds: {weather.clouds.all}%</p>
          <p>📊 Pressure: {weather.main.pressure} hPa</p>
          <p>
            📍 Geo coords: [{weather.coord.lat}, {weather.coord.lon}]
          </p>
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Enter a city to get weather data</p>
      )}
    </div>
  );
}

export default App;


