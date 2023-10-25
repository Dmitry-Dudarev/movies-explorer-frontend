import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const [isNavigationVisible, setNavigationVisible] = React.useState(false);
  const changeNavigationVisibility = () => {
    setNavigationVisible(!isNavigationVisible)
  }

  const location = useLocation();

  const isNotFoundPage = !['/', '/movies', '/saved-movies', '/profile', '/signup', '/signin'].includes(location.pathname);
  const showHeader = !['/signin', '/signup'].includes(location.pathname) && !isNotFoundPage;
  const showFooter = !['/signin', '/signup', '/profile'].includes(location.pathname) && !isNotFoundPage;

  const navigate = useNavigate();

  function signOut() {
    navigate('/', { replace: true });
    setLoggedIn(false);
  };

  return (
    <div className='app'>
      <div className="app-content">
        {showHeader && <Header loggedIn={loggedIn} changeNavigationVisibility={changeNavigationVisibility} />}
        <Navigation isNavigationVisible={isNavigationVisible} changeNavigationVisibility={changeNavigationVisibility} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile onSignOut={signOut} />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {showFooter && <Footer />}
      </div>
    </div>
  )
}

export default App;
