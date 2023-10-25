import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound(props) {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  };

  return (
    <section className='not-found-page'>
      <div className='not-found-page__info'>
        <h2 className='app-text not-found-page__title'>404</h2>
        <p className='app-text not-found-page__text'>Страница не найдена</p>
      </div>
      <button onClick={handleGoBack} className='app-text app-link not-found-page__button'>Назад</button>
    </section>
  )
}

export default NotFound;