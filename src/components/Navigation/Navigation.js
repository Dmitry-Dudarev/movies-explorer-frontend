import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileLogo from '../../images/profile__logo.svg';
import closeIcon from '../../images/navigation__close-icon.svg';
import './Navigation.css';

function Navigation({ isNavigationVisible, changeNavigationVisibility }) {
  const location = useLocation();
  const handleClose = (event) => {
    if (event.target.classList.contains('navigation')) {
      changeNavigationVisibility();
    }
  };
  return (
    <section className={`navigation ${isNavigationVisible ? 'navigation_visible' : ''}`} onClick={handleClose}>
      <div className='navigation__content'>
        <button className='navigation__close-button'>
          <img className='navigation__close-icon app-link' src={closeIcon} alt='Иконка закрытия меню' onClick={changeNavigationVisibility} />
        </button>
        <div className='navigation__text-links'>
          <Link
            className={`app-link navigation__link app-text ${location.pathname === '/' ? 'navigation__link_current' : ''}`}
            to='/'>
            Главная
          </Link>
          <Link
            className={`app-link navigation__link app-text ${location.pathname === '/movies' ? 'navigation__link_current' : ''}`}
            to='/movies'>
            Фильмы
          </Link>
          <Link
            className={`app-link navigation__link app-text ${location.pathname === '/saved-movies' ? 'navigation__link_current' : ''}`}
            to='/saved-movies'>
            Сохранённые фильмы
          </Link>
        </div>
        <div className='navigation__profile-container'>
          <Link className='app-link navigation__profile-link' to="/profile">
            <img className='navigation__profile-logo' src={profileLogo} alt='Профиль' />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Navigation;