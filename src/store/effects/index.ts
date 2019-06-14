import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { observationListEpic } from "./observationListEpics";
import { birdObnservationsListEpic } from "./birdObservationsListEpics";

export const rootEpic = combineEpics(
  observationListEpic,
  birdsListEpic,
  birdObnservationsListEpic
);
