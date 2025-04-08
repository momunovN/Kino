<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoviePage from './pages/MoviePage/MoviePage';

 function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
>>>>>>> a3e24a1a1e3fa1c3a3893658f7ec0d32eda8db37
