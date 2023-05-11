import axios from "axios";

export const FETCH_INITIAL_VIDEOGAMES_SUCCESS = 'FETCH_INITIAL_VIDEOGAMES_SUCCESS';
export const SEARCH_VIDEOGAMES_SUCCESS = 'SEARCH_VIDEOGAMES_SUCCESS';
export const FETCH_VIDEOGAME_SUCCESS = 'FETCH_VIDEOGAME_SUCCESS';
export const GET_BY_GENRES_SUCCESS = 'GET_BY_GENRES_SUCCESS';
export const GET_ALL_PLATFORMS = 'GET_ALL_PLATFORMS';
export const FORM_VIDEOGAME_SUCCESS = 'FORM_VIDEOGAME_SUCCESS';
export const FILTER_VIDEOGAMES_BY_GENRE = 'FILTER_VIDEOGAMES_BY_GENRE';
export const FILTER_VIDEOGAMES_BY_SOURCE = 'FILTER_VIDEOGAMES_BY_SOURCE';
export const SORT_VIDEOGAMES_BY_ALPHABET = 'SORT_VIDEOGAMES_BY_ALPHABET';
export const SORT_VIDEOGAMES_BY_RATING = 'SORT_VIDEOGAMES_BY_RATING';
export const CHANGE_PAGE = 'CHANGE_PAGE';

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
      console.log(error);
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
      console.log(error);
    }
  };
 };

 // Accion para obtener los videojuegos por ID
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
      console.log(error);
    }
  };
};


// Accion para obtener los generos
export const getByGenres = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/genres`);
      const GenresDetail = response.data;
      return dispatch({
        type: GET_BY_GENRES_SUCCESS,
        payload: GenresDetail
      })
    } catch (error) {
      console.log(error);
    }
  }
}


// Accion para crear los videojuegos
export const FormVideogames = (videogame) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/videogames`, videogame);
      const FormVideogame = response.data;
      return dispatch({
        type: FORM_VIDEOGAME_SUCCESS,
        payload: FormVideogame
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export const getAllPlatforms = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/videogames`);
      const allPlatforms = response.data.map((element) => element.platforms);
      const platforms = allPlatforms.flat();
      const uniquePlatforms = [...new Set(platforms)];

      dispatch({
        type: GET_ALL_PLATFORMS,
        payload: uniquePlatforms,
      });
    } catch (error) {
      console.log(error);
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