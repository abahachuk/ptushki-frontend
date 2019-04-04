import { combineReducers } from "redux";
import { routerReducer } from "./routerReducer";
import { signUpReducer } from "./signUpReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  signUp: signUpReducer
});
