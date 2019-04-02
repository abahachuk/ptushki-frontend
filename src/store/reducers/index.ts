import { handleAction } from "redux-actions";
import { combineReducers } from "redux";
import { sampleActionIncrement } from "../actions";
import { signUpReducer } from "../../app/features/auth/signup/signUpReducer";

export const rootReducer = combineReducers({
  birdsCount: handleAction(
    sampleActionIncrement,
    (state, action) => state + action.payload,
    0
  ),
  signUp: signUpReducer
});
