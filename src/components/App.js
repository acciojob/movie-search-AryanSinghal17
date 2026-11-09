
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "99eb9fd1";

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
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search)}`
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

      {loading && <p>Loading...</p>}

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/200x300?text=No+Poster"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>

            <p>Release Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
