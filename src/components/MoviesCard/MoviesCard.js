import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LikeIcon } from '../../images/movie-card__like-icon.svg';
import { ReactComponent as DeleteIcon } from '../../images/saved-movies__delete-icon.svg';

function MoviesCard(props) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-movies";

  const { nameRU, duration, image } = props.movie;

  const [message, setMessage] = React.useState(null);

  const isLiked = props.savedMovies && props.savedMovies.some(savedMovie => savedMovie.movieId === props.movie.movieId);
  const [isCardLiked, setCardLiked] = React.useState(isLiked);

  const toggleCardLike = async () => {
    if (!isCardLiked) {
      try {
        await props.addMovie(props.movie);
        setCardLiked(true);
        setMessage('Добавлено');
      } catch (err) {
        console.error(`Ошибка при сохранении фильма: ${err.errorData.message}`);
        setMessage('Что-то пошло не так');
      }
    } else {
      try {
        await props.deleteMovie(props.movie.movieId);
        setCardLiked(false);
        setMessage('Удалено');
      } catch (err) {
        console.error(`Ошибка при удалении фильма: ${err.errorData.message}`);
        setMessage('Что-то пошло не так');
      }
    };
  };

  const deleteCardLike = async () => {
    try {
      await props.deleteMovie(props.movie.movieId);
      setCardLiked(false);
    } catch (err) {
      console.error(`Ошибка при удалении фильма: ${err.errorData.message}`);
      setMessage('Что-то пошло не так');
    }
  };

  const likeStyles = isCardLiked ?
    { '--fill': '#FF3055', '--border': '#FF3055' }
    :
    { '--fill': 'none', '--border': '#424242' };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м`;
  };

  const picture = image;

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <article className='movie-card'>
      <a href={props.movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img src={picture} alt={nameRU} className='movie-card__image' />
      </a>
      {message && <div className="app-text movie-card__message">{message}</div>}
      <div className='movie-card__bottom'>
        <div className='movie-card__info'>
          <p className='movie-card__title app-text'>{nameRU}</p>

          {isSavedPage ?
            <DeleteIcon className='app-link movie-card__delete-icon' onClick={deleteCardLike} />
            :
            <LikeIcon style={likeStyles} className='app-link movie-card__like-icon' onClick={toggleCardLike} />
          }
        </div>
        <p className='movie-card__duration app-text'>{formatDuration(duration)}</p>
      </div>
    </article>
  );
}

export default MoviesCard;
