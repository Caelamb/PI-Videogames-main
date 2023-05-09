import { 
  FETCH_INITIAL_VIDEOGAMES_SUCCESS, 
  FETCH_INITIAL_VIDEOGAMES_FAILURE,
  SEARCH_VIDEOGAMES_SUCCESS,
  SEARCH_VIDEOGAMES_FAILURE,
  FILTER_VIDEOGAMES_BY_GENRE,
  FILTER_VIDEOGAMES_BY_SOURCE,
  SORT_VIDEOGAMES_BY_ALPHABET,
  SORT_VIDEOGAMES_BY_RATING,
  CHANGE_PAGE,
   } from '../actions';

const initialState = {
  videogames: [],
  loading: false,
  error: null,
  currentPage: 1,
  gameDetails: {
    loading: false,
    error: null,
    game: null,
  },
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
        const alphabetOrder = action.payload;
        if (alphabetOrder === 'asc') {
        const sortedByAlphabet = state.videogames.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        return {
          ...state,
          videogames: sortedByAlphabet,
          loading: false,
          error: null,
        };
      } else if (alphabetOrder === 'desc') {
        const sortedByAlphabet = state.videogames.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        return {
          ...state,
          videogames: sortedByAlphabet,
          loading: false,
          error: null,
        };
      } else {
        return state; // No se realiza ninguna modificación
      }
      case SORT_VIDEOGAMES_BY_RATING:
        const ratingOrder = action.payload;
        if (ratingOrder === 'asc') {
          const sortedByRating = state.videogames.slice().sort((a, b) => {
            return a.rating - b.rating;
          });
          return {
            ...state,
            videogames: sortedByRating,
            loading: false,
            error: null,
          };
        } else if (ratingOrder === 'desc') {
          const sortedByRating = state.videogames.slice().sort((a, b) => {
            return b.rating - a.rating;
          });
          return {
            ...state,
            videogames: sortedByRating,
            loading: false,
            error: null,
          };
        } else {
          return state; // No se realiza ninguna modificación
        }
    default:
      return state;
  }
};

export default gamesReducer;





  // const genre = action.payload;
  // const filteredByGenre = state.allvideogames.filter((game) =>
  //   game.Genres && game.Genres.toLowerCase().includes(genre.toLowerCase())
  // );
  // return {
  //   ...state,
  //   allvideogames: filteredByGenre,
  //   loading: false,
  //   error: null,
  // };