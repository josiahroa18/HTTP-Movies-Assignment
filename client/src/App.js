import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from './Movies/EditMovie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';

const App = () => {
  const [ savedList, setSavedList ] = useState([]);
  const [ movieList, setMovieList ] = useState([]);
  const [ movieCount, setMovieCount ] = useState(0);
  const [ editCount, setEditCount ] = useState(0);
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        setMovieCount(res.data.length);
      })
      .catch(err => console.log(err.response));
  };

  const addMovie = () => {
    history.push('/add-movie')
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const increaseMovieCount = () => {
    setMovieCount(movieCount + 1);
  }

  const decreaseMovieCount = () => {
    setMovieCount(movieCount - 1);
  }

  const handleEditCount = () => {
    setEditCount(editCount + 1);
  }

  useEffect(() => {
    getMovieList();
  }, [movieCount, editCount]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <div className='add-movie' onClick={addMovie}>Add Movie</div>
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} decreaseMovieCount={decreaseMovieCount}/>
      </Route>

      <Route path='/update-movie/:id'>
        <EditMovie handleEditCount={handleEditCount}/>
      </Route>

      <Route path='/add-movie'>
        <AddMovie increaseMovieCount={increaseMovieCount}/>
      </Route>
    </>
  );
};

export default App;
