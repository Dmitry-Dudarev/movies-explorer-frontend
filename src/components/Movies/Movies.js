import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies(props) {
  const [showCardList, setShowCardList] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [moviesAfterFiltration, setMoviesAfterFiltration] = React.useState([]);

  React.useEffect(() => {
    if (isSubmitted) {
      setShowCardList(true);
    }
  }, [isSubmitted]);

  return (
    <section className='movies'>
      <SearchForm
        pageKey="main"
        shouldFetchMovies={true}
        getMovies={props.getMovies}
        setIsSubmitted={setIsSubmitted}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        movies={props.movies}
        setMoviesAfterFiltration={setMoviesAfterFiltration}
      />
      {showCardList && <MoviesCardList
        isLoading={isLoading}
        errorMessage={errorMessage}
        moviesAfterFiltration={moviesAfterFiltration}
        addMovie={props.addMovie}
        savedMovies={props.savedMovies}
        deleteMovie={props.deleteMovie}
      />}
    </section>
  );
};

export default Movies;