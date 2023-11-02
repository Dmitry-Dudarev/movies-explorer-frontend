 export const baseMainURL = 'https://api.Brunneng.nomoredomainsicu.ru';

export const registerNewUser = async (userData) => {
  try {
    const response = await fetch(`${baseMainURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при отправке данных регистрации на сервер: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${baseMainURL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при отправке данных авторизации на сервер: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${baseMainURL}/signout`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при выходе из учетной записи: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCurrentUserData = async () => {
  try {
    const response = await fetch(`${baseMainURL}/users/me`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при получении данных пользователя: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const setInformationAboutUser = async (userData) => {
  try {
    const response = await fetch(`${baseMainURL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при редактировании профиля: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAllLikedMovies = async () => {
  try {
    const response = await fetch(`${baseMainURL}/movies`, {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при получении сохраненных фильмов: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMovie = async (movieData) => {
  try {
    const response = await fetch(`${baseMainURL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movieData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при сохранении карточки фильма: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteMovie = async (movieId) => {
  try {
    const response = await fetch(`${baseMainURL}/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`Ошибка при удалении фильма: ${response.status}`);
      error.status = response.status;
      error.errorData = errorData;
      throw error;
    }

    return await response.json();

  } catch (err) {
    console.error(err);
    throw err;
  }
};
