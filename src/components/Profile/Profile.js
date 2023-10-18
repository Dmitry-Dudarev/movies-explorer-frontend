import React from 'react';
import './Profile.css';

function Profile(props) {
  const [name, setName] = React.useState('Дмитрий');
  const [email, setEmail] = React.useState('dmitry@yandex.ru');

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function submitProfileForm(e) {
    e.preventDefault();
  };

  return (
    <section className='profile'>
      <h2 className='profile__title app-text'>Привет, {name}</h2>
      <form className='profile-form' onSubmit={submitProfileForm}>
        <div className='profile-form__inputs'>
          <label className='app-text profile-form__label profile-form__name-label'>Имя</label>
          <input name='profileName' className='app-text profile-form__input profile-form__name' value={name} onChange={handleNameChange}
            placeholder='Имя' type='text' minLength={2}
            maxLength={40} required />
          <label className='app-text profile-form__label profile-form__name-label'>E-mail</label>
          <input name='profileEmail' className='app-text profile-form__input profile-form__email' value={email} onChange={handleEmailChange}
            placeholder='Email' type='email' minLength={2}
            maxLength={40} required />
        </div>
        <button type='submit' className='app-link app-text profile-form__edit-button'>Редактировать</button>
      </form>
      <button className='app-link app-text profile__leave-button'>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;