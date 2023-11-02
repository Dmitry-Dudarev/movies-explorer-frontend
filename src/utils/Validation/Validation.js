export function setValidationMessage(inputElement) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity('Это поле обязательно для заполнения');
  } else if (inputElement.validity.typeMismatch && inputElement.type === 'email') {
    inputElement.setCustomValidity('Введите корректный email');
  } else if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity(`Минимальная длина - ${inputElement.minLength} символов`);
  } else if (inputElement.validity.tooLong) {
    inputElement.setCustomValidity(`Максимальная длина - ${inputElement.maxLength} символов`);
  } else {
    inputElement.setCustomValidity('');
  }
}