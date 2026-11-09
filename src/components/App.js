
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function deatApi() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const url = `https://www.omdbapi.com/?apikey=69f788d2&s=${encodeURIComponent(name)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.log(data.Error);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Movie name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={deatApi}>Search</button>

      {loading && <p>Loading...</p>}

      {movies.map((movie) => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} width="100" />
        </div>
      ))}
    </div>
  );
}

export default App;
