import { combineReducers } from "redux";
import { routerReducer } from "./routerReducer";

export const rootReducer = combineReducers({
  router: routerReducer
});
