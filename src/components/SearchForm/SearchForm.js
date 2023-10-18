import React from 'react';
import './SearchForm.css';
import searchFormButton from '../../images/search-form__button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const submitForm = (event) => {
    event.preventDefault();
  }
  return (
    <form className='search-form' onSubmit={submitForm}>
      <div className='search-form__input-wrapper'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input app-text'
        />
        <button type='submit' className='search-form__button app-link'>
          <img className='search-form__button-image' src={searchFormButton} alt='Поиск' />
        </button>
      </div>
      <FilterCheckbox checkboxLabel='Короткометражки' />
      <hr className='app-borderline search-form__borderline' />
    </form>
  );
}

export default SearchForm;