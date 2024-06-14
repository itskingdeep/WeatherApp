import React, { useState, useEffect, useCallback } from 'react';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import Favorites from './Favorites';
import axios from 'axios';
import '../App.css';

const WeatherDashboard = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [units, setUnits] = useState('metric');

  const getWeather = useCallback(async (city) => {
    localStorage.setItem('lastCity', city);
    const apiKey = 'c98f77b202263697202989ed276dc3d8';
    const currentWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`);

    setCurrentWeather(currentWeatherResponse.data);
    setForecast(forecastResponse.data);
  }, [units]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get('http://localhost:5000/favorites');
      setFavorites(response.data);
    };
    fetchFavorites();

    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) getWeather(lastCity);
  }, [getWeather]);

  const addFavorite = async (city) => {
    const response = await axios.post('http://localhost:5000/favorites', { city });
    setFavorites([...favorites, response.data]);
  };

  const removeFavorite = async (id) => {
    await axios.delete(`http://localhost:5000/favorites/${id}`);
    setFavorites(favorites.filter(favorite => favorite.id !== id));
  };

  return (
    <div className="weather-dashboard">
      <Search getWeather={getWeather} />
      <WeatherDisplay 
        currentWeather={currentWeather} 
        forecast={forecast} 
        units={units} 
        addFavorite={addFavorite} 
      />
      <Favorites 
        favorites={favorites} 
        getWeather={getWeather} 
        removeFavorite={removeFavorite} 
      />
      <button onClick={() => setUnits(units === 'metric' ? 'imperial' : 'metric')}>
        Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
    </div>
  );
};

export default WeatherDashboard;
