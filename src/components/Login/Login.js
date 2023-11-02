import React from 'react';
import AuthTemplate from '../AuthTemplate/AuthTemplate';
import { setValidationMessage } from '../../utils/Validation/Validation';
import { ErrorMessages } from '../../utils/ErrorMessages/ErrorMessages';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const isSubmitButtonDisabled = !isEmailValid || !isPasswordValid;

  // универсальный обработчик ввода
  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // универсальный обработчик валидации
  function handleValidation(e) {
    // кастомный компонент сообщений об ошибках
    setValidationMessage(e.target);
    const { name, validity, validationMessage } = e.target;
    if (name === 'email') {
      setIsEmailValid(validity.valid);
      setEmailErrorMessage(validationMessage);
    } else if (name === 'password') {
      setIsPasswordValid(validity.valid);
      setPasswordErrorMessage(validationMessage);
    }
  };

  function submitForm(e) {
    e.preventDefault();
  }
  const formFields = [
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
    email: emailErrorMessage,
    password: passwordErrorMessage
  };

  return (
    <AuthTemplate
      title='Рады видеть!'
      formFields={formFields}
      values={{ email, password }}
      handleInputChange={handleInputChange}
      handleValidation={handleValidation}
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
}

export default Login;