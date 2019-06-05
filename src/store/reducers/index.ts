import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { birdsListReducer } from "./birdsListReducer";
import { observationListReducer } from "./observationListReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";

import { routerReducer } from "./routerReducer";
import { userPreferencesReducer } from "./userPreferencesReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer,
  userPreferences: userPreferencesReducer,
  observationList: observationListReducer,
  birdsList: birdsListReducer
});
