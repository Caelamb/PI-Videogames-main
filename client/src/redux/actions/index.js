import axios from "axios";

export const SEARCH_GAMES = 'SEARCH_GAMES';
export const FETCH_GAMES = 'FETCH_GAMES';
export const FILTER_GAMES_BY_GENRE = 'FILTER_GAMES_BY_GENRE';
export const FILTER_GAMES_BY_ORIGIN = 'FILTER_GAMES_BY_ORIGIN';
export const SORT_GAMES = 'SORT_GAMES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return async (dispatch) => {
        const response = (await axios.get("https://jsonplaceholder.typicode.com/users")).data;
        return dispatch({
            type: "GET_USERS",
            payload: response
        })
    }
};

// Action para buscar videojuegos por nombre
export const searchGames = (searchTerm) => async (dispatch) => {
    try {
      const res = await axios.get(`/videogames?name=${searchTerm}`);
      dispatch({ type: SEARCH_GAMES, payload: res.data });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Action para obtener los primeros 100 videojuegos desde la ruta GET /videogames
  export const fetchGames = (page) => async (dispatch) => {
    try {
      const res = await axios.get(`/videogames?page=${page}`);
      dispatch({ type: FETCH_GAMES, payload: res.data });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Action para filtrar los videojuegos por género
  export const filterGamesByGenre = (genre) => async (dispatch) => {
    try {
      const res = await axios.get(`/videogames?genre=${genre}`);
      dispatch({ type: FILTER_GAMES_BY_GENRE, payload: res.data });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Action para filtrar los videojuegos por origen (API o base de datos)
  export const filterGamesByOrigin = (origin) => async (dispatch) => {
    try {
      const res = await axios.get(`/videogames?origin=${origin}`);
      dispatch({ type: FILTER_GAMES_BY_ORIGIN, payload: res.data });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Action para ordenar los videojuegos por nombre o por rating, ascendente o descendente
  export const sortGames = (sortBy, sortOrder) => async (dispatch) => {
    try {
      const res = await axios.get(`/videogames?sortBy=${sortBy}&sortOrder=${sortOrder}`);
      dispatch({ type: SORT_GAMES, payload: res.data });
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  
  // Action para cambiar la página actual del paginado
  export const setCurrentPage = (page) => async (dispatch) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: page });
    return dispatch(fetchGames(page));
  };
  