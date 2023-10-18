import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../movies-dev';

function Movies(props) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;