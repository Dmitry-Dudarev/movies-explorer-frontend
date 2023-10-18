import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import Profile from '../Profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);

  const [isNavigationVisible, setNavigationVisible] = React.useState(false);
  const changeNavigationVisibility = () => {
    setNavigationVisible(!isNavigationVisible)
  }

  const location = useLocation();
  const showHeader = !['/signin', '/signup'].includes(location.pathname);
  const showFooter = !['/signin', '/signup', '/profile'].includes(location.pathname);

  return (
    <div className='app'>
      <div className="app-content">
        {showHeader && <Header loggedIn={loggedIn} changeNavigationVisibility={changeNavigationVisibility} />}
        <Navigation isNavigationVisible={isNavigationVisible} changeNavigationVisibility={changeNavigationVisibility} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        {showFooter && <Footer />}
      </div>
    </div>
  )
}

export default App;
