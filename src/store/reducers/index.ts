import { handleAction } from "redux-actions";
import { combineReducers } from "redux";
import { sampleActionIncrement } from "../actions";
import { routerReducer } from "../../app/features/routing/routerReducer";

export const rootReducer = combineReducers({
  router: routerReducer,
  birdsCount: handleAction(
    sampleActionIncrement,
    (state, action) => state + action.payload,
    0
  )
});
