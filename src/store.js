import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import Logger from "redux-logger";

const middlewares = [Logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
