import { combineReducers } from "redux";
import { routerReducer } from "./routerReducer";
import { authReducer } from "./authReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer
});
