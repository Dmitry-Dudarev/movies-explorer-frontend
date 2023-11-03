import React from 'react';
import './SearchForm.css';
import searchFormButton from '../../images/search-form__button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { filterMovies } from '../../utils/MoviesFiltration';

function SearchForm(props) {
  const [searchValue, setSearchValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isShort, setIsShort] = React.useState(false);

  React.useEffect(() => {
    // Получаем данные из localStorage при монтировании
    if (props.pageKey !== "saved") {
      try {
        const savedSearchValue = localStorage.getItem(`${props.pageKey}-searchValue`);
        const savedIsShort = JSON.parse(localStorage.getItem(`${props.pageKey}-isShort`));
        const savedMovies = JSON.parse(localStorage.getItem(`${props.pageKey}-movies`));
        if (savedSearchValue) setSearchValue(savedSearchValue);
        if (savedIsShort !== null) setIsShort(savedIsShort);
        if (savedMovies) props.setMoviesAfterFiltration(savedMovies);
        if (savedSearchValue && savedIsShort !== null && savedMovies) {
          props.setIsSubmitted(true);
        }

      } catch (error) {
        console.error("Ошибка при получении данных из localStorage:", error);
      }
    }
  }, []);

  React.useEffect(() => {
    if (props.pageKey === "saved") {
      setSearchValue("");
    }
  }, [props.pageKey]);

  const toggleShortMovies = () => {
    const newIsShort = !isShort;
    setIsShort(newIsShort);
    submitForm(undefined, newIsShort);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // сброс ошибки при вводе

    console.log('helo')

    if (errorMessage) setErrorMessage("");
  };

  const submitForm = async (e, checkboxValue = isShort) => {
    if (e) {
      e.preventDefault();
    }
    if (!searchValue.trim()) {
      setErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    props.setIsLoading(true);
    props.setIsSubmitted(true);

    try {
      if (props.shouldFetchMovies && props.movies.length === 0) {
        await props.getMovies();
      }
      const filteredMovies = filterMovies(props.movies, searchValue, checkboxValue);
      props.setMoviesAfterFiltration(filteredMovies);

      localStorage.setItem(`${props.pageKey}-searchValue`, searchValue);
      localStorage.setItem(`${props.pageKey}-isShort`, isShort);
      localStorage.setItem(`${props.pageKey}-movies`, JSON.stringify(filteredMovies));
    } catch (error) {
      setErrorMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
    } finally {
      props.setIsLoading(false);
    }
  };

  return (
    <form className='search-form' onSubmit={submitForm}>
      <div className='search-form__input-wrapper'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input app-text'
          value={searchValue}
          onChange={handleChange}
        />
        <button type='submit' className='search-form__button app-link'>
          <img className='search-form__button-image' src={searchFormButton} alt='Поиск' />
        </button>
      </div>
      <span className='app-text search-form__error-message'>{errorMessage}</span>
      <FilterCheckbox
        checkboxLabel='Короткометражки'
        checked={isShort}
        onChange={toggleShortMovies}
      />
      <hr className='app-borderline search-form__borderline' />
    </form>
  );
};

export default SearchForm;