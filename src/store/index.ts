import { routerMiddleware } from "connected-react-router";
import { createStore, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux-subspace";
import { createEpicMiddleware } from "redux-subspace-observable";
import thunk from "redux-thunk";

import { StateType } from "typesafe-actions";
import { history } from "../app/features/routing/history";
import { rootEpic } from "./effects";
import { prevRouterLocationMiddleware } from "./prevRouterLocationMiddleware";
import { rootReducer } from "./reducers";

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      prevRouterLocationMiddleware,
      thunk,
      epicMiddleware,
      routerMiddleware(history)
    )
  )
);

epicMiddleware.run(rootEpic);

export type RootState = StateType<typeof rootReducer>;
