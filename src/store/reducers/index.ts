import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { birdsListReducer } from "./birdsListReducer";
import { birdObservationsListReducer } from "./birdObservationsReducer";
import { observationListReducer } from "./observationListReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { routerReducer } from "./routerReducer";
import { userPreferencesReducer } from "./userPreferencesReducer";
import { initialDataReducer } from "./initialDataReducer";
import { observationReducer } from "./observationReducer";
import { birdReducer } from "./birdReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  resetPassword: resetPasswordReducer,
  auth: authReducer,
  userPreferences: userPreferencesReducer,
  observationList: observationListReducer,
  birdsList: birdsListReducer,
  birdObservationsList: birdObservationsListReducer,
  initialData: initialDataReducer,
  observation: observationReducer,
  bird: birdReducer
});
