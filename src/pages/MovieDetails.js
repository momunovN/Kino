import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingContext } from '../contexts/BookingContext';
import '../App.css';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', seats: 1 });
  const { setBookings } = useContext(BookingContext);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`, {
        headers: {
          'X-API-KEY': '31b8142c-7c84-42d7-ba58-c5866aa1bc7b',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      ...formData,
      movie: {
        id: movie.kinopoiskId,
        title: movie.nameRu,
        date: new Date().toLocaleString()
      }
    };
    setBookings(prev => [...prev, booking]);
    navigate('/history');
  };

  if (!movie) return <div>Загрузка...</div>;

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-button">← Назад</button>
      <img src={movie.posterUrl} alt={movie.nameRu} className="detail-poster" />
      <div className="detail-info">
        <h1>{movie.nameRu}</h1>
        <p>Год: {movie.year}</p>
        <p>Страна: {movie.countries.map(c => c.country).join(', ')}</p>
        <p>Жанр: {movie.genres.map(g => g.genre).join(', ')}</p>
        <p>Рейтинг: {movie.ratingKinopoisk}</p>
        <p>Время: {movie.filmLength} минут</p>
        <p>Возраст: {movie.ratingAgeLimits || 'Нет информации'}</p>
        
        <form onSubmit={handleSubmit} className="booking-form">
          <h2>Бронирование билетов</h2>
          <input
            type="text"
            placeholder="Ваше имя"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="number"
            min="1"
            max="10"
            value={formData.seats}
            onChange={e => setFormData({...formData, seats: e.target.value})}
          />
          <button type="submit">Подтвердить бронь</button>
        </form>
      </div>
    </div>
  );
}