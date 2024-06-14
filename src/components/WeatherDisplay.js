import React from 'react';

const WeatherDisplay = ({ currentWeather, forecast, units, addFavorite }) => {
  if (!currentWeather || !forecast) return <div>No weather data available</div>;

  // Helper function to get one forecast per day
  const getDailyForecasts = (list) => {
    const dailyForecasts = [];
    const seenDays = new Set();

    list.forEach((weather) => {
      const date = new Date(weather.dt * 1000);
      const day = date.getDate();

      if (!seenDays.has(day)) {
        dailyForecasts.push(weather);
        seenDays.add(day);
      }

      // Stop when we have 5 days
      if (dailyForecasts.length === 5) {
        return;
      }
    });

    return dailyForecasts;
  };

  const dailyForecasts = getDailyForecasts(forecast.list);

  return (
    <div className="weather-display">
      <h2>{currentWeather.name}</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>Temperature: {currentWeather.main.temp}° {units === 'metric' ? 'C' : 'F'}</p>
      <button onClick={() => addFavorite(currentWeather.name)}>Add to Favorites</button>
      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {dailyForecasts.map((weather, index) => (
          <div key={index}>
            <p>{new Date(weather.dt * 1000).toLocaleDateString()}</p>
            <p>{weather.weather[0].description}</p>
            <p>Temp: {weather.main.temp}° {units === 'metric' ? 'C' : 'F'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
