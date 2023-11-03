import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import PublicRouteElement from '../PublicRouteElement/PublicRouteElement';
import CurrentUserContext from '../../contexts/CurrentUserContext';
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
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import { BASE_PICTURE_URL } from '../../utils/BasePictureURL';

function App() {

  const getInitialUserData = () => {
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      return JSON.parse(storedUserData);
    } else {
      return { name: '', about: '' };
    }
  };

  const [currentUser, setCurrentUser] = React.useState(getInitialUserData);
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('loggedIn') === 'true');
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isNavigationVisible, setNavigationVisible] = React.useState(false);

  const changeNavigationVisibility = () => {
    setNavigationVisible(!isNavigationVisible)
  };

  const location = useLocation();

  const isNotFoundPage = !['/', '/movies', '/saved-movies', '/profile', '/signup', '/signin'].includes(location.pathname);
  const showHeader = !['/signin', '/signup'].includes(location.pathname) && !isNotFoundPage;
  const showFooter = !['/signin', '/signup', '/profile'].includes(location.pathname) && !isNotFoundPage;

  const navigate = useNavigate();

  async function checkUserAuthAndGetLikedMovies() {
    try {
      const response = await mainApi.getAllLikedMovies();
      // Если запрос успешно выполнен, значит пользователь авторизован
      setSavedMovies(response);
      localStorage.setItem('loggedIn', 'true');
      setLoggedIn(true);
    } catch (error) {
      console.error(`Ошибка при получении сохраненных фильмов: ${error}`);
      // Если запрос завершился ошибкой, значит токен невалидный или истек
      setLoggedIn(false);
    };
  };

  React.useEffect(() => {
    const storedUserData = localStorage.getItem('currentUser');
    if (storedUserData) {
      const currentUserData = JSON.parse(storedUserData);
      setCurrentUser(currentUserData);
    }
  }, []);

  React.useEffect(() => {
    checkUserAuthAndGetLikedMovies();
  }, []);

  async function registerUser(registrationUserData) {
    try {
      await mainApi.registerNewUser(registrationUserData);

      const loginData = {
        email: registrationUserData.email,
        password: registrationUserData.password
      };
      // После успешной регистрации автоматически авторизуем пользователя
      await loginUser(loginData);
    } catch (err) {
      console.error(`Ошибка при регистрации пользователя: ${err.errorData.message}`);
      throw err;
    };
  };

  async function loginUser(loginUserData) {
    try {
      await mainApi.loginUser(loginUserData);
      const currentUserData = await mainApi.getCurrentUserData();
      localStorage.setItem('currentUser', JSON.stringify(currentUserData));
      localStorage.setItem('loggedIn', 'true');
      setCurrentUser(currentUserData);
      setLoggedIn(true);
      await checkUserAuthAndGetLikedMovies();
      navigate('/movies', { replace: true });
    } catch (err) {
      console.error(`Ошибка при авторизации пользователя: ${err.errorData.message}`);
      throw err;
    };
  };

  async function logoutUser() {
    try {
      await mainApi.logoutUser();
      setLoggedIn(false);
      setCurrentUser({ name: '', about: '' });
      localStorage.clear();
      navigate('/', { replace: true });
    } catch (err) {
      console.error(`Ошибка при выходе из аккаунта: ${err.errorData.message}`);
      throw err;
    };
  };

  async function editProfile(userData) {
    try {
      const updatedUserData = await mainApi.setInformationAboutUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
      setCurrentUser(updatedUserData);
    } catch (err) {
      console.error(`Ошибка при регистрации пользователя: ${err.errorData.message}`);
      throw err;
    };
  };

  async function getMovies() {
    try {
      const moviesList = await moviesApi.getMovies();
      const formattedMovies = moviesList.map(movie => ({
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_PICTURE_URL + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: BASE_PICTURE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      }));
      setMovies(formattedMovies);
      return formattedMovies;
    } catch (err) {
      console.error(`Ошибка при получении фильмов: ${err.errorData.message}`);
    };
  };

  async function getAllLikedMovies() {
    try {
      const getAllLikedMoviesServerData = await mainApi.getAllLikedMovies();
      setSavedMovies(getAllLikedMoviesServerData)
    } catch (err) {
      console.error(`Ошибка при получении сохраненных фильмов: ${err.errorData.message}`);
    };
  };

  async function addMovie(movieData) {
    try {
      const addMovieServerData = await mainApi.addMovie(movieData);
      setSavedMovies((prevMovies) => [...prevMovies, addMovieServerData]);
    } catch (err) {
      console.error(`Ошибка при сохранении фильма: ${err.errorData.message}`);
      throw err;
    };
  };

  async function deleteMovie(movieId) {
    const movieToDelete = savedMovies.find(movie => movie.movieId === movieId);

    if (!movieToDelete) {
      console.error('Фильм не найден');
      return;
    }

    try {
      await mainApi.deleteMovie(movieToDelete._id);
      setSavedMovies((prevMovies) => prevMovies.filter(movie => movie.movieId !== movieId));
    } catch (err) {
      console.error(`Ошибка при удалении фильма: ${err.errorData.message}`);
      throw err;
    };
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <div className="app-content">
          {showHeader && <Header loggedIn={loggedIn} changeNavigationVisibility={changeNavigationVisibility} />}
          <main>
            <Navigation isNavigationVisible={isNavigationVisible} changeNavigationVisibility={changeNavigationVisibility} />
            <Routes>
              <Route path='/' element={<Main />} />

              <Route path='/movies' element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Movies}
                  movies={movies}
                  getMovies={getMovies}
                  addMovie={addMovie}
                  getAllLikedMovies={getAllLikedMovies}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                />
              } />
              <Route path='/saved-movies' element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  deleteMovie={deleteMovie}
                  savedMovies={savedMovies}
                  getAllLikedMovies={getAllLikedMovies}
                />
              } />
              <Route path='/profile' element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  element={Profile}
                  logoutUser={logoutUser}
                  editProfile={editProfile}
                />
              } />

              <Route path='/signup' element={
                <PublicRouteElement
                  loggedIn={loggedIn}
                  element={Register}
                  registerUser={registerUser}
                />
              } />

              <Route path='/signin' element={
                <PublicRouteElement
                  loggedIn={loggedIn}
                  element={Login}
                  loginUser={loginUser}
                />
              } />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
          {showFooter && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
