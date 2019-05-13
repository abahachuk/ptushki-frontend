import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { StateType } from "typesafe-actions";
import { RootAction } from "typesafe-actions/dist/create-reducer";
import { createEpicMiddleware } from "redux-observable";
import { rootReducer } from "./reducers";
import { rootEpic } from "./effects";

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
