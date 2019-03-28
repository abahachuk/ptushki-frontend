import { applyMiddleware, createStore } from "redux";
import { StateType } from "typesafe-actions";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = StateType<typeof rootReducer>;
