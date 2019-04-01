import { handleAction } from "redux-actions";
import { combineReducers } from "redux";
import { sampleActionIncrement } from "../actions";

export const rootReducer = combineReducers({
  birdsCount: handleAction(
    sampleActionIncrement,
    (state, action) => state + action.payload,
    0
  )
});
