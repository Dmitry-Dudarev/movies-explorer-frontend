import React from 'react';
import AuthTemplate from '../AuthTemplate/AuthTemplate';
import { handleValidation } from '../../utils/Validation';
import { handleLoginErrors } from '../../utils/serverErrorHandlers'
import { emailPattern } from '../../utils/regexPatterns';

function Login(props) {
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const isSubmitButtonDisabled = !isEmailValid || !isPasswordValid;

  const [userData, setUserData] = React.useState({ email: '', password: '' });
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');

  // универсальный обработчик ввода
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
      setEmailValid: setIsEmailValid,
      setPasswordValid: setIsPasswordValid,
    }, {
      setEmailErrorMessage,
      setPasswordErrorMessage,
    });
  };

// регистрация пользователя
async function submitForm(e) {
  e.preventDefault();
  try {
    await props.loginUser(userData);
  } catch (err) {
    // ловим ошибку регистрации из App
    const errorMessage = handleLoginErrors(err);
    setServerErrorMessage(errorMessage);
  }
};
  
  const formFields = [
    {
      type: 'email',
      name: 'email',
      label: 'E-mail',
      pattern: emailPattern,
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
    email: emailErrorMessage,
    password: passwordErrorMessage
  };

  return (
    <AuthTemplate
      title='Рады видеть!'
      formFields={formFields}
      values={userData}
      handleInputChange={handleInputChange}
      handleValidation={handleValidationWrapper}
      errorMessages={errorMessages}
      serverErrorMessage={serverErrorMessage}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      onSubmit={submitForm}
      submitButtonText='Войти'
      bottomText='Ещё не зарегистрированы? '
      bottomLinkRoute='/signup'
      bottomLinkText='Регистрация'
    />
  );
};

export default Login;