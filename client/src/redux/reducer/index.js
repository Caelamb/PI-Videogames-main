import { 
  SEARCH_GAMES, 
  FETCH_GAMES, 
  FILTER_GAMES_BY_GENRE, 
  FILTER_GAMES_BY_ORIGIN, 
  SORT_GAMES, 
  SET_CURRENT_PAGE } from '../actions';

const initialState = {
  gamesList: [],
  filteredGames: [],
  currentPage: 1,
  totalPages: 0,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GAMES:
      return {
        ...state,
        filteredGames: action.payload,
        totalPages: 1, // Como la búsqueda siempre devuelve menos de 100 resultados, establecemos que hay 1 página
      };

    case FETCH_GAMES:
      return {
        ...state,
        gamesList: action.payload.results,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case FILTER_GAMES_BY_GENRE:
    case FILTER_GAMES_BY_ORIGIN:
    case SORT_GAMES:
      return {
        ...state,
        filteredGames: action.payload.results,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default gamesReducer;
