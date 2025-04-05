import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesContext } from '../../context/MoviesContext';
import { BookingContext } from '../../context/BookingContext';
import './MoviePage.scss';

const MoviePage = () => {
  const { id } = useParams();
  const { movies } = useContext(MoviesContext);
  const { addBooking } = useContext(BookingContext);
  const [selectedSeats, setSelectedSeats] = useState(1);
  
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) return <div>Фильм не найден</div>;

  const handleBooking = () => {
    addBooking({
      movieId: movie.id,
      movieTitle: movie.title,
      seats: selectedSeats,
      date: new Date().toLocaleDateString()
    });
    alert(`Вы успешно забронировали ${selectedSeats} билет(а) на фильм "${movie.title}"`);
  };

  return (
    <div className="movie-page">
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} className="movie-poster-large" />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p><strong>Год:</strong> {movie.year}</p>
          <p><strong>Жанр:</strong> {movie.genre.join(', ')}</p>
          <p><strong>Описание:</strong> {movie.description}</p>
          <p><strong>Длительность:</strong> {movie.duration} мин.</p>
          <p><strong>Рейтинг:</strong> {movie.rating}/10</p>
        </div>
      </div>
      
      <div className="booking-section">
        <h2>Бронирование билетов</h2>
        <div className="seat-selection">
          <label>
            Количество мест:
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={selectedSeats}
              onChange={(e) => setSelectedSeats(parseInt(e.target.value))}
            />
          </label>
        </div>
        <button onClick={handleBooking} className="book-button">
          Забронировать
        </button>
      </div>
    </div>
  );
};

export default MoviePage;