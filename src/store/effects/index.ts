import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { navigationEpic } from "./navigationEpic";
import { observationListEpic } from "./observationListEpics";
import { birdObnservationsListEpic } from "./birdObservationsListEpics";
import { verifyObservationEpic } from "./verificationEpics";
import { requestInitialDataEpic } from "./initialDataEpics";
import { observationEpic } from "./observationEpics";
import { birdEpic } from "./birdEpics";

export const rootEpic = combineEpics(
  observationListEpic,
  birdsListEpic,
  birdObnservationsListEpic,
  verifyObservationEpic,
  navigationEpic,
  requestInitialDataEpic,
  observationEpic,
  birdEpic
);
