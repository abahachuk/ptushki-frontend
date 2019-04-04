import { combineReducers } from "redux";
import { routerReducer } from "./routerReducer";

import { signInReducer } from "./signInReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  signIn: signInReducer,
  resetPassword: resetPasswordReducer
});
