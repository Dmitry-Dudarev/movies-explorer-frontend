import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  // переменная, содержащая значение ширины окна просмотра
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // обновление состояния windowWidth с новой шириной окна
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    // к глобальному объекту window добвляется слушатель события resize
    window.addEventListener('resize', handleResize);

    return () => {
      // удаляется слушатель события
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // количество изначально отрисовываемых карточек в зависимости
  // от ширины окна просмотра
  let initialCardsCount;
  if (windowWidth >= 1280) {
    initialCardsCount = 12;
  } else if (windowWidth >= 768) {
    initialCardsCount = 8;
  } else {
    initialCardsCount = 5;
  }
  // вводим счетчик отображаемых карточек
  const [displayedCardsCount, setDisplayedCardsCount] = React.useState(initialCardsCount);
  // при нажатии на кнопку Ещё отобразится дополнительный пакет элементов, 
  // равный начальному количеству карточек
  const handleShowMoreCards = () => {
    setDisplayedCardsCount(displayedCardsCount => displayedCardsCount + initialCardsCount);
  };
  const displayedMovies = props.movies.slice(0, displayedCardsCount);
  const moviesLength = props.movies.length;

  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader />
      ) : moviesLength === 0 ? (
        <p className="app-text movies-card-list__message">Фильмов по вашему запросу не найдено.</p>
      ) : (
        <>
          <div className="movies-card-list__grid">
            {displayedMovies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
              />
            ))}
          </div>

          <button
            className={`movies-card-list__more-btn app-text app-link ${displayedCardsCount >= props.movies.length ? 'movies-card-list__more-btn_hidden' : ''}`} onClick={handleShowMoreCards}>
            Ещё
          </button>

        </>
      )}
    </section>
  );
}

export default MoviesCardList;
