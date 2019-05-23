import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-subspace-observable";
import thunk from "redux-thunk";

import { StateType } from "typesafe-actions";
import { RootAction } from "typesafe-actions/dist/create-reducer";
import { rootEpic } from "./effects";
import { rootReducer } from "./reducers";

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, epicMiddleware))
);

epicMiddleware.run(rootEpic);

export type RootState = StateType<typeof rootReducer>;
