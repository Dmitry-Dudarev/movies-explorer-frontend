import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../movies-dev';

function SavedMovies (props) {
  return(
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default SavedMovies;