export const getMovies = async () => {
  try {
    const response = await fetch("https://api.nomoreparties.co/beatfilm-movies");
    
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(`При получении фильмов произошла ошибка: ${errorData.message || ''}`);
      throw error;
    }

    return response.json();

  } catch (err) {
    console.error(err);
    throw err;
  }
};
