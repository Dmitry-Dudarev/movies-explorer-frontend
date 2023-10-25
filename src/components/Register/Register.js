import React from 'react';
import AuthTemplate from '../AuthTemplate/AuthTemplate';
import { setValidationMessage } from '../../utils/Validation/Validation';
import { ErrorMessages } from '../../utils/ErrorMessages/ErrorMessages';

function Register(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [isNameValid, setIsNameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);
  const [serverErrorMessage, setServerErrorMessage] = React.useState('');
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const isSubmitButtonDisabled = !isNameValid || !isEmailValid || !isPasswordValid;

  // универсальный обработчик ввода
  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
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
    if (name === 'name') {
      setIsNameValid(validity.valid);
      setNameErrorMessage(validationMessage);
    } else if (name === 'email') {
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
      type: 'text',
      name: 'name',
      label: 'Имя',
      minLength: 2,
      maxLength: 30,
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
      values={{ name, email, password }}
      handleInputChange={handleInputChange}
      handleValidation={handleValidation}
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