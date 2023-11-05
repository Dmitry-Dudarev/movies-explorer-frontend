import { ErrorMessages } from "./ErrorMessages";

export function handleRegistrationErrors(error) {
  if (error.status === 409) {
    return ErrorMessages.registerEmailDuplicationErrorMessage;
  } else if (error.status === 400) {
    return ErrorMessages.registerCreateUserErrorMessage;
  } else if (error.status === 500) {
    return ErrorMessages.registerCreateUserErrorMessage;
  } else {
    return ErrorMessages.generalErrorMessage;
  }
};

export function handleLoginErrors(error) {
  if (error.status === 401) {
    return ErrorMessages.loginDataErrorMessage;
  } else if (error.status === 500) {
    return ErrorMessages.loginAuthorizationErrorMessage;
  } else {
    return ErrorMessages.generalErrorMessage;
  }
};

export function handleEditProfileErrors(error) {
  if (error.status === 400) {
    return ErrorMessages.editProfileErrorMessage;
  } else if (error.status === 404) {
    return ErrorMessages.editProfileErrorMessage;
  } else if (error.status === 409) {
    return ErrorMessages.editProfileEmailDuplicationErrorMessage;
  } else if (error.status === 500) {
    return ErrorMessages.generalErrorMessage;
  } else {
    return ErrorMessages.generalErrorMessage;
  }
};