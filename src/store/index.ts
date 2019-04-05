import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/**
 * @desc Infers State object from reducer map object
 */
export type StateType<ReducerOrMap> = ReducerOrMap extends (
  ...args: any[]
) => any
  ? ReturnType<ReducerOrMap>
  : ReducerOrMap extends object
  ? { [K in keyof ReducerOrMap]: StateType<ReducerOrMap[K]> }
  : never;

export type RootState = StateType<typeof rootReducer>;
