import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { MovieList, MovieDetails, MovieForm } from './components';
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data])

    useEffect(() => {
      if(!token["mr-token"]) window.location.href = '/';
    }, [token])

  const movieClicked = movie => {
    setSelectedMovie(movie);
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditMovie(null);
  }

  const updateMovie = movie => {
    const newMovies = movies.map( mov => {
      if(mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }

  const editClicked = movie => {
    setEditMovie(movie);
    setSelectedMovie(null);
  }

  const newMovie = () => {
    setEditMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClick = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies)
  }

  const logoutUser = () => {
    deleteToken(["mr-token"]);
  }

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error loading movies</h1>

  return (
    <div className="App">
      <header className='App-header'>
        <h1>
          <FontAwesomeIcon icon={faFilm}/>
          <span>
          Movie Rater
          </span>
        </h1>
          <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
        <div className="layout">
          <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClick}
          />
          <button onClick={ newMovie }>New Movie</button>
          </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          { editMovie ?
            <MovieForm
              movie={editMovie}
              updateMovie={updateMovie}
              newMovieCreated={movieCreated}
          /> : null}

        </div>
    </div>
  );
}

export default App;
