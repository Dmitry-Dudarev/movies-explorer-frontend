import React from 'react';
import './Profile.css';
import { setValidationMessage } from '../../utils/Validation/Validation';
import { ErrorMessages } from '../../utils/ErrorMessages/ErrorMessages';

function Profile(props) {
  const [name, setName] = React.useState('Дмитрий');
  const [email, setEmail] = React.useState('dmitry@yandex.ru');
  const [isEditing, setIsEditing] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const isSaveButtonDisabled = !isNameValid || !isEmailValid;

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handleNameValidation(e) {
    setValidationMessage(e.target);
    setIsNameValid(e.target.validity.valid);
    setNameErrorMessage(e.target.validationMessage);
  };

  function handleEmailValidation(e) {
    setValidationMessage(e.target);
    setIsEmailValid(e.target.validity.valid);
    setEmailErrorMessage(e.target.validationMessage);
  };

  function toggleEdit() {
    setIsEditing(!isEditing);
  };

  function submitProfileForm(e) {
    e.preventDefault();
  };

  return (
    <section className='profile'>
      <h2 className='profile__title app-text'>Привет, {name}</h2>
      <form className='profile-form' onSubmit={submitProfileForm}>
        <div className='profile-form__inputs'>
          <span className='app-text profile-form__error-message profile-form__name-error-message'>{nameErrorMessage}</span>
          <label className='app-text profile-form__label profile-form__name-label'>Имя</label>
          <input
            name='profileName'
            className='app-text profile-form__input profile-form__name'
            value={name}
            onChange={handleNameChange}
            onInput={handleNameValidation}
            placeholder='Имя'
            type='text'
            minLength={2}
            maxLength={30}
            required
            disabled={!isEditing}
          />

          <hr className="profile__divider"></hr>

          <label className='app-text profile-form__label profile-form__name-label'>E-mail</label>
          <input
            name='profileEmail'
            className='app-text profile-form__input profile-form__email'
            value={email} onChange={handleEmailChange}
            onInput={handleEmailValidation}
            placeholder='E-mail'
            type='email'
            required
            disabled={!isEditing}
          />
          <span className='app-text profile-form__error-message profile-form__email-error-message'>{emailErrorMessage}</span>
        </div>

        <div className='profile__buttons'>
          <span className='app-text profile__error-message'>{errorMessage}</span>
          <button
            type={isEditing ? 'button' : 'submit'}
            className={
              `app-link 
              app-text 
              profile-form__button 
              ${isEditing ? 'profile-form__save-button' : 'profile-form__edit-button'}
              ${isSaveButtonDisabled && 'profile-form__save-button--disabled'}`
            }
            onClick={toggleEdit}
            disabled={isSaveButtonDisabled}
          >
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
          {!isEditing && (
            <button className='app-link app-text profile__logout-button' onClick={props.onSignOut}>Выйти из аккаунта</button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;