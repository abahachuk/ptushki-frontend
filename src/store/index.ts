import { applyMiddleware, createStore } from "redux";
import { StateType } from "typesafe-actions";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = StateType<typeof rootReducer>;
