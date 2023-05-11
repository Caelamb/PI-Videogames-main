import { 
  FETCH_INITIAL_VIDEOGAMES_SUCCESS, 
  SEARCH_VIDEOGAMES_SUCCESS,
  FETCH_VIDEOGAME_SUCCESS,
  GET_BY_GENRES_SUCCESS,
  GET_ALL_PLATFORMS,
  FORM_VIDEOGAME_SUCCESS,
  FILTER_VIDEOGAMES_BY_GENRE,
  FILTER_VIDEOGAMES_BY_SOURCE,
  SORT_VIDEOGAMES_BY_ALPHABET,
  SORT_VIDEOGAMES_BY_RATING,
  CHANGE_PAGE,
   } from '../actions';

const initialState = {
  videogames: [],
  CopyVideogames: [],
  videoGameDetails: {},
  Genres: [],
  platforms: [],
  loading: false,
  error: null,
  currentPage: 1,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INITIAL_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videogames: action.payload,
        CopyVideogames: action.payload,
        loading: false,
        error: null,
      };

    case SEARCH_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videogames: action.payload,
        loading: false,
        error: null,
      };

    case FETCH_VIDEOGAME_SUCCESS:
        return {
          ...state,
          videoGameDetails: action.payload,
          error: null
      };

    case GET_BY_GENRES_SUCCESS:
        return{
            ...state,
            Genres: action.payload,
            loading: false,
            error: null,
        }

    case GET_ALL_PLATFORMS:
      return {
        ...state,
        platforms: action.payload
      }
    
    case FORM_VIDEOGAME_SUCCESS:
          return{
              ...state
          }

    case FILTER_VIDEOGAMES_BY_GENRE:
         let filteredGames = [];
          const selectedGenre = action.payload;      
          if (selectedGenre) {
           filteredGames = state.CopyVideogames.filter((game) => {
            if (!game.Genres) {
               return false; // El juego no tiene géneros, se descarta
             }
             const genresArray = game.Genres.split(", "); // Separar la cadena de géneros en un array
             return genresArray.includes(selectedGenre); // Comprobar si el género seleccionado está presente en el array de géneros
            });
          } else {
            filteredGames = state.CopyVideogames; // No se ha seleccionado un género, se muestran todos los juegos
          }   
           return {
              ...state,
              videogames: filteredGames,
              loading: false,
              error: null,
            };

    case FILTER_VIDEOGAMES_BY_SOURCE:
      const source = action.payload;
      let filterGames = [];

      if (source === 'All sources') {
        filterGames = state.CopyVideogames;
      } else {
        filterGames = state.CopyVideogames.filter((game) =>
          game.platforms.includes(source)
        );
      }

      return {
        ...state,
        videogames: filterGames,
        loading: false,
        error: null,
      };
      
    case SORT_VIDEOGAMES_BY_ALPHABET:
        const alphabetOrder = action.payload;
        let sortedByAlphabet;
      
        if (alphabetOrder === 'asc') {
          sortedByAlphabet = state.CopyVideogames.slice().sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        } else if (alphabetOrder === 'desc') {
          sortedByAlphabet = state.CopyVideogames.slice().sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
        } else {
          sortedByAlphabet = state.CopyVideogames; // Restaurar la lista original
        }
        return {
          ...state,
          videogames: sortedByAlphabet,
          loading: false,
          error: null,
        };

    case SORT_VIDEOGAMES_BY_RATING:
        const ratingOrder = action.payload;
        let sortedByRating;
      
        if (ratingOrder === 'asc') {
          sortedByRating = state.CopyVideogames.slice().sort((a, b) => {
            return a.rating - b.rating;
          });
        } else if (ratingOrder === 'desc') {
          sortedByRating = state.CopyVideogames.slice().sort((a, b) => {
            return b.rating - a.rating;
          });
        } else {
          sortedByRating = state.CopyVideogames; // Restaurar la lista original
        } return {
          ...state,
          videogames: sortedByRating,
          loading: false,
          error: null,
        };

    case CHANGE_PAGE:
          return {
            ...state,
            currentPage: action.payload,
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