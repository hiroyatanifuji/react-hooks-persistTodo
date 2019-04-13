// redux、reducer、middleware関連
import { createStore as reduxCreateStore, applyMiddleware, combineReducers } from "redux";
import * as reducers from "./reducers"
import logger from "redux-logger";

// middleware設定
const rootMiddleware = applyMiddleware(logger);

// reducer設定
const rootReducer = combineReducers({
  ...reducers
});

// redux設定
const createStore = () => (
  reduxCreateStore(
    rootReducer,
    rootMiddleware,
  )
);

export default createStore;

