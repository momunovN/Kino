import React, { createContext, useState, useContext, useEffect } from 'react';

// Создаем контекст для бронирований
export const BookingContext = createContext();

// Провайдер контекста
export const BookingProvider = ({ children }) => {
  // Состояние для хранения списка бронирований
  const [bookings, setBookings] = useState([]);
  // Состояние для загрузки данных
  const [loading, setLoading] = useState(false);
  // Состояние для ошибок
  const [error, setError] = useState(null);

  // При монтировании компонента загружаем бронирования из localStorage
  useEffect(() => {
    setLoading(true);
    try {
      const savedBookings = localStorage.getItem('movieBookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch (err) {
      setError('Не удалось загрузить историю бронирований');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // При изменении бронирований сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem('movieBookings', JSON.stringify(bookings));
  }, [bookings]);

  // Функция для добавления нового бронирования
  const addBooking = (newBooking) => {
    setBookings(prevBookings => [
      ...prevBookings,
      {
        ...newBooking,
        id: Date.now(), // Используем timestamp как уникальный ID
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      }
    ]);
  };

  // Функция для отмены бронирования
  const cancelBooking = (bookingId) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      )
    );
  };

  // Функция для полного удаления бронирования
  const removeBooking = (bookingId) => {
    setBookings(prevBookings => 
      prevBookings.filter(booking => booking.id !== bookingId)
    );
  };

  // Функция для получения всех активных бронирований
  const getActiveBookings = () => {
    return bookings.filter(booking => booking.status === 'confirmed');
  };

  // Функция для получения бронирований по ID фильма
  const getBookingsByMovieId = (movieId) => {
    return bookings.filter(
      booking => booking.movieId === movieId && booking.status === 'confirmed'
    );
  };

  // Значение контекста, которое будет доступно всем потребителям
  const contextValue = {
    bookings,
    activeBookings: getActiveBookings(),
    loading,
    error,
    addBooking,
    cancelBooking,
    removeBooking,
    getBookingsByMovieId,
  };

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};