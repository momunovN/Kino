import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './main/main';
import MovieDetails from './pages/MovieDetails';
import BookingHistory from './pages/BookingHistory';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/history" element={<BookingHistory />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;