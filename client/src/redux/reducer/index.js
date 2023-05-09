import { 
  FETCH_INITIAL_VIDEOGAMES_SUCCESS, 
  FETCH_INITIAL_VIDEOGAMES_FAILURE,
  SEARCH_VIDEOGAMES_SUCCESS,
  SEARCH_VIDEOGAMES_FAILURE,
  FILTER_VIDEOGAMES_BY_GENRE,
  FILTER_VIDEOGAMES_BY_SOURCE,
  SORT_VIDEOGAMES_BY_ALPHABET,
  SORT_VIDEOGAMES_BY_RATING,
  CHANGE_PAGE
   } from '../actions';

const initialState = {
  videogames: [],
  loading: false,
  error: null,
  currentPage: 1,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INITIAL_VIDEOGAMES_SUCCESS:
      case SEARCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videogames: action.payload,
        loading: false,
        error: null,
      };
      case FETCH_INITIAL_VIDEOGAMES_FAILURE:
      case SEARCH_VIDEOGAMES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case CHANGE_PAGE:
          return {
            ...state,
            currentPage: action.payload,
          }
      case FILTER_VIDEOGAMES_BY_GENRE:
      case FILTER_VIDEOGAMES_BY_SOURCE:
      case SORT_VIDEOGAMES_BY_ALPHABET:
      case SORT_VIDEOGAMES_BY_RATING:
         // Puedes implementar la lógica correspondiente para manejar estos casos
        return state;
    default:
      return state;
  }
};

export default gamesReducer;
