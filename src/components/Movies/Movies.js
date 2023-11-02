import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { movies } from '../../movies-dev';

function Movies(props) {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
    </section>
  );
}

export default Movies;