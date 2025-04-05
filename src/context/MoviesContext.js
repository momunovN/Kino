import React, { createContext, useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
      setFilteredMovies(data);
      
      // Extract unique genres
      const allGenres = data.flatMap(movie => movie.genre);
      const uniqueGenres = [...new Set(allGenres)];
      setGenres(uniqueGenres);
      
      // Extract unique years
      const allYears = data.map(movie => movie.year);
      const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a);
      setYears(uniqueYears);
    };

    fetchMovies();
  }, []);

  const filterMovies = ({ genres = [], year = '' }) => {
    let result = [...movies];
    
    if (genres.length > 0) {
      result = result.filter(movie => 
        genres.some(genre => movie.genre.includes(genre)) // Fixed missing parenthesis
      );
    }
    
    if (year) {
      result = result.filter(movie => movie.year === year);
    }
    
    setFilteredMovies(result);
  };

  return (
    <MoviesContext.Provider value={{ 
      movies, 
      filteredMovies, 
      genres, 
      years, 
      filterMovies 
    }}>
      {children}
    </MoviesContext.Provider>
  );
};