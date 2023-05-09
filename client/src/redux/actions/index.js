import axios from "axios";

export const FETCH_INITIAL_VIDEOGAMES_SUCCESS = 'FETCH_INITIAL_VIDEOGAMES_SUCCESS';
export const FETCH_INITIAL_VIDEOGAMES_FAILURE = 'FETCH_INITIAL_VIDEOGAMES_FAILURE';
export const SEARCH_VIDEOGAMES_SUCCESS = 'SEARCH_VIDEOGAMES_SUCCESS';
export const SEARCH_VIDEOGAMES_FAILURE = 'SEARCH_VIDEOGAMES_FAILURE';
export const FILTER_VIDEOGAMES_BY_GENRE = 'FILTER_VIDEOGAMES_BY_GENRE';
export const FILTER_VIDEOGAMES_BY_SOURCE = 'FILTER_VIDEOGAMES_BY_SOURCE';
export const SORT_VIDEOGAMES_BY_ALPHABET = 'SORT_VIDEOGAMES_BY_ALPHABET';
export const SORT_VIDEOGAMES_BY_RATING = 'SORT_VIDEOGAMES_BY_RATING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const FETCH_VIDEOGAME_SUCCESS = 'FETCH_VIDEOGAME_SUCCESS';
export const FETCH_VIDEOGAME_FAILURE = 'FETCH_VIDEOGAME_FAILURE';

const BASE_URL = 'http://localhost:3001';

// Action para buscar videojuegos por iniciales
 export const fetchInitialVideogames = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/videogames`);
      const allVideogames = response.data;
      return dispatch({ 
        type: FETCH_INITIAL_VIDEOGAMES_SUCCESS, 
        payload: allVideogames
      });
    } catch (error) {
      dispatch({ type: FETCH_INITIAL_VIDEOGAMES_FAILURE, payload: error.message });
    }
  }
 }

 // Acción para obtener los videojuegos nombre
 export const searchVideogames = (searchQuery) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/videogames?name=${searchQuery}`);
      const videogames = response.data;
      return dispatch({ 
        type: SEARCH_VIDEOGAMES_SUCCESS, 
        payload: videogames 
      });
    } catch (error) {
      dispatch({ type: SEARCH_VIDEOGAMES_FAILURE, payload: error.message });
    }
  };
};

export const fetchVideoGameDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/videogames/${id}`);
      const videoGameDetails = response.data;
      return dispatch({ 
        type: FETCH_VIDEOGAME_SUCCESS, 
        payload: videoGameDetails 
      });
    } catch (error) {
      dispatch({ type: FETCH_VIDEOGAME_FAILURE, payload: error.message });
    }
  };
};

export const filterVideogamesByGenre = (genre) => {
  return { type: FILTER_VIDEOGAMES_BY_GENRE, payload: genre };
};

export const filterVideogamesBySource = (source) => {
  return { type: FILTER_VIDEOGAMES_BY_SOURCE, payload: source };
};

export const sortVideogamesByAlphabet = (order) => {
  return { type: SORT_VIDEOGAMES_BY_ALPHABET, payload: order };
};

export const sortVideogamesByRating = (order) => {
  return { type: SORT_VIDEOGAMES_BY_RATING, payload: order };
};

export const changePage = (pageNumber) => {
  return { type: CHANGE_PAGE, payload: pageNumber };
};