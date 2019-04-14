import { combineReducers } from "redux";
import { default as TodoReducers } from "./TodoReducers";
import { default as TimeLineReducers } from "./TimeLineReducers";

const rootReducer = combineReducers({
  TodoReducers,
  TimeLineReducers
});

export default rootReducer;

