import React, { useState } from "react";

const MovieFilter = ({ 
  genres, 
  selectedGenre, 
  setSelectedGenre, 
  keyword,
  setKeyword,
  onApply 
}) => {
  const [localKeyword, setLocalKeyword] = useState(keyword);
  const [localGenre, setLocalGenre] = useState(selectedGenre);

  const handleApply = () => {
    setKeyword(localKeyword);
    setSelectedGenre(localGenre);
    onApply();
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="genre">Жанр:</label>
        <select
          id="genre"
          value={localGenre}
          onChange={(e) => setLocalGenre(e.target.value)}
        >
          <option value="">Все жанры</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.genre}>
              {genre.genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="keyword">Ключевое слово:</label>
        <input
          id="keyword"
          type="text"
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
          placeholder="Введите ключевое слово"
        />
      </div>

      <button onClick={handleApply} className="apply-button">
        Применить
      </button>
    </div>
  );
};

export default MovieFilter;