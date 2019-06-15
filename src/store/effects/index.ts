import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { navigationEpic } from "./navigationEpic";
import { observationListEpic } from "./observationListEpics";
import { birdObnservationsListEpic } from "./birdObservationsListEpics";
import { verifyObservationEpic } from "./verificationEpics";

export const rootEpic = combineEpics(
  observationListEpic,
  birdsListEpic,
  birdObnservationsListEpic,
  verifyObservationEpic,
  navigationEpic
);
