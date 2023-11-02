import React from 'react';
import './Profile.css';
import { setValidationMessage } from '../../utils/Validation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { usernamePattern, emailPattern } from '../../utils/regexPatterns';
import { handleEditProfileErrors } from '../../utils/serverErrorHandlers';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [initialName, setInitialName] = React.useState(currentUser.name || '');
  const [initialEmail, setInitialEmail] = React.useState(currentUser.email || '');
  const [name, setName] = React.useState(currentUser.name || '');
  const [email, setEmail] = React.useState(currentUser.email || '');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');
  const dataHasChanged = name !== initialName || email !== initialEmail;
  const isSaveButtonDisabled = !isNameValid || !isEmailValid || !dataHasChanged;
  const isEditButtonDisabled = false; // Эта кнопка всегда активна
  const [serverSuccessMessage, setServerSuccessMessage] = React.useState('');

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
    setInitialName(name);
    setInitialEmail(email);
    setIsEditing(!isEditing);
  };

  async function submitProfileForm(e) {
    e.preventDefault();
    try {
      await props.editProfile({ name, email });
      setServerErrorMessage('')
      setServerSuccessMessage('Профиль успешно обновлен!')
    } catch (err) {
      // ловим ошибку редактирования из App
      const errorMessage = handleEditProfileErrors(err);
      setServerErrorMessage(errorMessage);
    }
  };

  return (
    <section className='profile'>
      <h2 className='profile__title app-text'>Привет, {name}</h2>
      <form className='profile-form' onSubmit={submitProfileForm}>
        <div className='profile-form__inputs'>
          <span className='app-text profile-form__error-message profile-form__name-error-message'>{nameErrorMessage}</span>
          <label className='app-text profile-form__label profile-form__name-label'>Имя</label>
          <input
            name='name'
            className='app-text profile-form__input profile-form__name'
            value={name}
            onChange={handleNameChange}
            onInput={handleNameValidation}
            placeholder='Имя'
            type='text'
            minLength={2}
            maxLength={30}
            required
            pattern={usernamePattern}
            disabled={!isEditing}
          />

          <hr className="profile__divider"></hr>

          <label className='app-text profile-form__label profile-form__name-label'>E-mail</label>
          <input
            name='email'
            className='app-text profile-form__input profile-form__email'
            value={email} onChange={handleEmailChange}
            onInput={handleEmailValidation}
            placeholder='E-mail'
            type='email'
            pattern={emailPattern}
            required
            disabled={!isEditing}
          />
          <span className='app-text profile-form__error-message profile-form__email-error-message'>{emailErrorMessage}</span>
        </div>

        <div className='profile__buttons'>
          <span className='app-text profile__error-message'>{serverErrorMessage}</span>
          <span className='app-text profile__success-message'>{serverSuccessMessage}</span>
          <button
            type={isEditing ? 'button' : 'submit'}
            className={
              `app-link 
              app-text 
              profile-form__button 
              ${isEditing ? 'profile-form__save-button' : 'profile-form__edit-button'}
              ${isEditing && isSaveButtonDisabled ? 'profile-form__save-button--disabled' : ''}`
            }
            onClick={toggleEdit}
            disabled={isEditing ? isSaveButtonDisabled : isEditButtonDisabled}
          >
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
          {!isEditing && (
            <button className='app-link app-text profile__logout-button' onClick={props.logoutUser}>Выйти из аккаунта</button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;