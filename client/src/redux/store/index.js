import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import gamesReducer from "../reducer";

export const store = createStore(
    gamesReducer,
     composeWithDevTools(applyMiddleware(thunk))
    ); 