import React from 'react';

const Favorites = ({ favorites, getWeather, removeFavorite }) => {
  return (
    <div className="favorites">
      <h3>Favorite Cities</h3>
      <ul>
        {favorites.map(favorite => (
          <li key={favorite.id}>
            <button onClick={() => getWeather(favorite.city)}>
              {favorite.city}
            </button>
            <button onClick={() => removeFavorite(favorite.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
