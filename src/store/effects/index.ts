import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { navigationEpic } from "./navigationEpic";
import { observationListEpic } from "./observationListEpics";

export const rootEpic = combineEpics(
  observationListEpic,
  birdsListEpic,
  navigationEpic
);
