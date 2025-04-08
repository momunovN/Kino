import React from 'react';
import { Link } from 'react-router-dom';

import './MovieCard.scss';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <p>{movie.genre.join(', ')}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
