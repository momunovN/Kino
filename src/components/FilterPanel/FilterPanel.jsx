import React, { useContext, useState } from 'react';
import { MoviesContext } from '../../context/MoviesContext';
import './FilterPanel.scss';

const FilterPanel = () => {
  const { genres, years, filterMovies } = useContext(MoviesContext);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  const handleGenreChange = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newSelectedGenres);
    filterMovies({ genres: newSelectedGenres, year: selectedYear });
  };

  const handleYearChange = (year) => {
    const newYear = year === selectedYear ? '' : year;
    setSelectedYear(newYear);
    filterMovies({ genres: selectedGenres, year: newYear });
  };

  return (
    <div className="filter-panel">
      <div className="genre-filters">
        <h4>Жанры</h4>
        {genres.map(genre => (
          <label key={genre}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
      <div className="year-filters">
        <h4>Год выпуска</h4>
        {years.map(year => (
          <label key={year}>
            <input
              type="radio"
              name="year"
              checked={selectedYear === year}
              onChange={() => handleYearChange(year)}
            />
            {year}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;