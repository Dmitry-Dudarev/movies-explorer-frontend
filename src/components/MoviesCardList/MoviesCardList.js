import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  // переменная, содержащая значение ширины окна просмотра
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [displayedCardsCount, setDisplayedCardsCount] = React.useState(calculateInitialCardsCount(window.innerWidth));
  const isLoading = props.isLoading;

  // установка задержки
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  };

  // Функция для вычисления количества изначально 
  // отрисовываемых карточек в зависимости от ширины окна просмотра
  function calculateInitialCardsCount(windowWidth) {
    if (windowWidth >= 1280) {
      return 12;
    } else if (windowWidth >= 768) {
      return 8;
    } else {
      return 5;
    };
  };

  React.useEffect(() => {
    // обновление состояния windowWidth с новой шириной окна
    // устанавливаем задержку
    const debouncedHandleResize = debounce(function () {
      setWindowWidth(window.innerWidth);
    }, 300);

    // к глобальному объекту window добвляется слушатель события resize
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      // удаляется слушатель события
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  React.useEffect(() => {
    setDisplayedCardsCount(calculateInitialCardsCount(windowWidth));
  }, [windowWidth]);

  React.useEffect(() => {
    const newInitialCardsCount = calculateInitialCardsCount(window.innerWidth);
    setDisplayedCardsCount(newInitialCardsCount);
  }, [props.searchCounter]); 

  // при нажатии на кнопку Ещё отобразится дополнительный пакет элементов
  const handleShowMoreCards = () => {
    let additionalCards;

    if (windowWidth >= 1280) {
      additionalCards = 3;
    } else if (windowWidth >= 768) {
      additionalCards = 2;
    } else {
      additionalCards = 2;
    }

    setDisplayedCardsCount(displayedCardsCount => displayedCardsCount + additionalCards);
  };

  const displayedMovies = props.isSavedMoviesPage
    ? props.moviesAfterFiltration
    : props.moviesAfterFiltration.slice(0, displayedCardsCount);

  const moviesLength = props.moviesAfterFiltration.length;
  const errorMessage = props.errorMessage;

  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : errorMessage ? (
        <p className="app-text movies-card-list__message">{errorMessage}</p>
      ) : moviesLength === 0 ? (
        <p className="app-text movies-card-list__message">Ничего не найдено.</p>
      ) : (
        <>
          <div className="movies-card-list__grid">
            {displayedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.movieId}
                addMovie={props.addMovie}
                savedMovies={props.savedMovies}
                deleteMovie={props.deleteMovie}
              />
            ))}
          </div>
          {!props.isSavedMoviesPage && (
            <button
              className={`movies-card-list__more-btn app-text app-link ${displayedCardsCount >= props.moviesAfterFiltration.length ? 'movies-card-list__more-btn_hidden' : ''}`} onClick={handleShowMoreCards}>
              Ещё
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
