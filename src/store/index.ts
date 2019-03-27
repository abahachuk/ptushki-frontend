import { createStore } from "redux";
import { StateType } from "typesafe-actions";
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, {});

export type RootState = StateType<typeof rootReducer>;
