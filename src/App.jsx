import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';
import SearchMe from './search.svg';
import MovieCard from './components/MovieCard';

// API key 40ad8aa2
const API_URL = 'https://www.omdbapi.com?apikey=40ad8aa2'


function App() {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    console.log(data.Search);
  }

  useEffect(() => {
    searchMovie(`Thor`)
  }, [])

  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <img
          src={SearchMe}
          alt="Search"
          onClick={() => setMovies(searchTitle)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
