import { routerMiddleware } from "connected-react-router";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux-subspace";
import { createEpicMiddleware } from "redux-subspace-observable";
import thunk from "redux-thunk";

import { StateType } from "typesafe-actions";
import { RootAction } from "typesafe-actions/dist/create-reducer";
import { history } from "../app/features/routing/history";
import { rootEpic } from "./effects";
import { rootReducer } from "./reducers";

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, epicMiddleware, routerMiddleware(history))
  )
);

epicMiddleware.run(rootEpic);

export type RootState = StateType<typeof rootReducer>;
