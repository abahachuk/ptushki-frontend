import { combineReducers } from "redux";
import { routerReducer } from "./routerReducer";
import { signUpReducer } from "../../app/features/auth/signup/signUpReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  signUp: signUpReducer
});
