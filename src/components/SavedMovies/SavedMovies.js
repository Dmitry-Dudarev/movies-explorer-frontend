import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [moviesAfterFiltration, setMoviesAfterFiltration] = React.useState([]);

  React.useEffect(() => {
    setMoviesAfterFiltration(props.savedMovies);
  }, [props.savedMovies]);

  return (
    <section className='saved-movies'>
      <SearchForm
        pageKey="saved"
        shouldFetchMovies={false}
        getMovies={props.getAllLikedMovies}
        setIsSubmitted={setIsSubmitted}
        setIsLoading={setIsLoading}
        setErrorMessage={setErrorMessage}
        movies={props.savedMovies}
        setMoviesAfterFiltration={setMoviesAfterFiltration}
      />
      <MoviesCardList
        isSavedMoviesPage={true}
        isLoading={isLoading}
        errorMessage={errorMessage}
        moviesAfterFiltration={moviesAfterFiltration || props.savedMovies}
        addMovie={props.addMovie}
        deleteMovie={props.deleteMovie}
      />
    </section>
  );
};

export default SavedMovies;