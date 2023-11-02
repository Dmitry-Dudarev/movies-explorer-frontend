import React from 'react';
import AuthTemplate from '../AuthTemplate/AuthTemplate';
import { handleValidation } from '../../utils/Validation';
import { usernamePattern } from '../../utils/regexPatterns';
import { handleRegistrationErrors } from '../../utils/serverErrorHandlers';

function Register(props) {
  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const isSubmitButtonDisabled = !isNameValid || !isEmailValid || !isPasswordValid;
  const [userData, setUserData] = React.useState({ name: '', email: '', password: '' });
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  // обработчик ввода
  function handleInputChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    });

    handleValidationWrapper(e);
  }

  // универсальный обработчик валидации
  function handleValidationWrapper(e) {
    handleValidation(e, {
      setNameValid: setIsNameValid,
      setEmailValid: setIsEmailValid,
      setPasswordValid: setIsPasswordValid,
    }, {
      setNameErrorMessage,
      setEmailErrorMessage,
      setPasswordErrorMessage,
    });
  };

  // регистрация пользователя
  async function submitForm(e) {
    e.preventDefault();
    try {
      await props.registerUser(userData);
    } catch (err) {
      // ловим ошибку регистрации из App
      const errorMessage = handleRegistrationErrors(err);
      setServerErrorMessage(errorMessage);
    }
  };

  const formFields = [
    {
      type: 'text',
      name: 'name',
      label: 'Имя',
      minLength: 2,
      maxLength: 30,
      pattern: usernamePattern,
      placeholder: 'Имя пользователя',
      isRequired: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      placeholder: 'Введите ваш E-mail',
      isRequired: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      isRequired: true,
    },
  ];

  const errorMessages = {
    name: nameErrorMessage,
    email: emailErrorMessage,
    password: passwordErrorMessage
  };

  return (
    <AuthTemplate
      title='Добро пожаловать!'
      formFields={formFields}
      values={userData}
      handleInputChange={handleInputChange}
      handleValidation={handleValidationWrapper}
      errorMessages={errorMessages}
      serverErrorMessage={serverErrorMessage}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      onSubmit={submitForm}
      submitButtonText='Зарегистрироваться'
      bottomText='Уже зарегистрированы? '
      bottomLinkRoute='/signin'
      bottomLinkText='Войти'
    />
  );
}

export default Register;