import { combineEpics } from "redux-observable";
import { observationListEpic } from "./observationListEpics";

export const rootEpic = combineEpics(observationListEpic);
