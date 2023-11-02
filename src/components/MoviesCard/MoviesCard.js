import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LikeIcon } from '../../images/movie-card__like-icon.svg';
import { ReactComponent as DeleteIcon } from '../../images/saved-movies__delete-icon.svg';


function MoviesCard(props) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-movies";

  const { nameRU, duration, thumbnail } = props.movie;
  const [isCardLiked, setCardLiked] = React.useState(false);
  const toggleCardLike = () => {
    setCardLiked(isCardLiked => !isCardLiked);
  }
  const deleteCardLike = () => {
    setCardLiked(false)
  }
  const likeStyles = isCardLiked ?
    { '--fill': '#FF3055', '--border': '#FF3055' }
    :
    { '--fill': 'none', '--border': '#424242' };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м`;
  };

  return (
    <article className='movie-card'>
      <img src={thumbnail} alt={nameRU} className='movie-card__image' />
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
