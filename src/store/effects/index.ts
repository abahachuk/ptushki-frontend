import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { observationListEpic } from "./observationListEpics";

export const rootEpic = combineEpics(observationListEpic, birdsListEpic);
