export function handleValidation(e, setStateFunctions, setErrorMessages) {
  setValidationMessage(e.target);
  const { name, validity, validationMessage } = e.target;

  if (name === 'name') {
    setStateFunctions.setNameValid(validity.valid);
    setErrorMessages.setNameErrorMessage(validationMessage);
  } else if (name === 'email') {
    setStateFunctions.setEmailValid(validity.valid);
    setErrorMessages.setEmailErrorMessage(validationMessage);
  } else if (name === 'password') {
    setStateFunctions.setPasswordValid(validity.valid);
    setErrorMessages.setPasswordErrorMessage(validationMessage);
  }
};

export function setValidationMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Это поле обязательно для заполнения');
  } else if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
    inputElement.setCustomValidity('Введите корректный email');
  } else if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity(`Минимальная длина - ${inputElement.minLength} символов`);
  } else if (inputElement.validity.tooLong) {
    inputElement.setCustomValidity(`Максимальная длина - ${inputElement.maxLength} символов`);
  } else if (inputElement.validity.patternMismatch && inputElement.name === 'name') {
    inputElement.setCustomValidity('Имя может содержать только слова, разделенные пробелом или дефисом');
  } else {
    inputElement.setCustomValidity('');
  }
};