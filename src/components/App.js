
import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "YOUR_API_KEY";

  const fetchMovies = async () => {
    if (!search.trim()) {
      setMovies([]);
      setError("Please enter a movie name");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=99eb9fd1&s=${encodeURIComponent(search)}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Movie Search App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchMovies();
            }
          }}
        />

        <button onClick={fetchMovies}>
          Search
        </button>
      </div>

      {loading && <p>Loading movies...</p>}

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
