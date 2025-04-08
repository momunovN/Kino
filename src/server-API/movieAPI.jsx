import React, { useState, useEffect } from 'react';
import './movie.scss';

function MovieApi() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1', {
        headers: {
          'X-API-KEY': '31b8142c-7c84-42d7-ba58-c5866aa1bc7b',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovies(data.films.slice(0, 10));
    };

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Топ 10 популярных фильмов</h1>
      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie.filmId} className="movie-card">
            <img 
              src={movie.posterUrl} 
              alt={movie.nameRu} 
              className="movie-poster"
            />
            <div className="movie-info">
              <h2>{movie.nameRu}</h2>
              <p>Год: {movie.year}</p>
              <p>Страна: {movie.countries.map(c => c.country).join(', ')}</p>
              <p>Жанр: {movie.genres.map(g => g.genre).join(', ')}</p>
              <p>Режиссер: {movie.filmInfo ? movie.filmInfo.directors.map(d => d.nameRu).join(', ') : 'Нет информации'}</p>
              <p>Рейтинг: {movie.rating}</p>
              <p>Время: {movie.filmLength} минут</p>
              <p>Возраст: {movie.ratingAgeLimits || 'Нет информации'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieApi;