import React from 'react';
import headerLogo from '../../images/header__logo.svg';
import profileLogoMainPage from '../../images/profile__logo-main-page.svg';
import profileLogo from '../../images/profile__logo.svg';
import menuIcon from '../../images/header__menu-icon.svg';
import './Header.css'
import { Link, useLocation } from 'react-router-dom';

function Header({ changeNavigationVisibility, ...props }) {
  const loggedIn = props.loggedIn;
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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

  const location = useLocation();
  const headerClass = location.pathname === '/' ? 'header header_main-page' : 'header';

  return (
    <header className={headerClass}>
      <Link className='app-link' to='/'>
        <img className='header__logo' src={headerLogo} alt='Логотип' />
      </Link>

      {loggedIn && windowWidth > 768 && (
        <div className='header__movies-bar header__bar'>
          <Link
            className={
              `app-link 
              header__movies-link 
              app-text 
              ${location.pathname === '/movies' ? 'header__movies-link_current' : ''}`
            }
            to='/movies'>
            Ффильмы
          </Link>
          <Link
            className={
              `app-link 
              header__movies-link 
              app-text 
              ${location.pathname === '/saved-movies' ? 'header__movies-link_current' : ''}`
            }
            to='/saved-movies'>
            Сохранённые фильмы
          </Link>
        </div>
      )}

      <div className='header__user-bar header__bar'>
        {loggedIn ? (
          windowWidth > 768 ? (
            <Link className='app-link header__profile-link' to='/profile'>
              <img className='header__profile-logo' src={location.pathname === '/' ? profileLogoMainPage : profileLogo} alt='Профиль' />
            </Link>
          ) : (
            <button className='app-link header__menu' onClick={changeNavigationVisibility}>
              <img className='header__menu-icon' src={menuIcon} alt='Меню' />
            </button>
          )
        ) : (
          <>
            <Link className='app-link header__register-link app-text' to='/signup'>Регистрация</Link>
            <Link className='app-link header__login-link app-text' to='/signin'>Войти</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;