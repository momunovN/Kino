import React, { useContext } from 'react';
import { MoviesContext } from '../../context/MoviesContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import './HomePage.scss';

const HomePage = () => {
  const { filteredMovies } = useContext(MoviesContext);

  return (
    <div className="home-page">
      <FilterPanel />
      <div className="movies-grid">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;