import {GET_USERS} from "../actions";

let initialState = {
    allUsers: [],
    games: [], // lista de videojuegos
    currentPage: 1, // página actual del paginado
    loading: false, // indicador de carga
    error: null, // mensaje de error en caso de que ocurra
};

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return {
                ...state,//siempre devolver todo el estado y despues modificar lo que queramos
                allUsers: action.payload,
            }
        default:
            return state; 
    }
};

export default rootReducer;

/*const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_GAMES:
        return {
          ...state,
          games: action.payload,
          currentPage: 1,
          loading: false,
          error: null,
        };
      case FETCH_GAMES:
        return {
          ...state,
          games: action.payload,
          loading: false,
          error: null,
        };
      case FILTER_GAMES_BY_GENRE:
        return {
          ...state,
          games: action.payload,
          currentPage: 1,
          loading: false,
          error: null,
        };
      case FILTER_GAMES_BY_ORIGIN:
        return {
          ...state,
          games: action.payload,
          currentPage: 1,
          loading: false,
          error: null,
        };
      case SORT_GAMES:
        return {
          ...state,
          games: action.payload,
          currentPage: 1,
          loading: false,
          error: null,
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
          loading: true,
          error: null,
        };
      default:
        return state;
    }
  };*/