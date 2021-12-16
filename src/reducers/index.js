import { tasksReducer } from "./TaskReducers";
import { combineReducers } from "redux";

let allReducers = combineReducers({
  tasks: tasksReducer,
});

export default allReducers;
