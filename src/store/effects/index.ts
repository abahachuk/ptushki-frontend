import { combineEpics } from "redux-observable";
import { birdEpic } from "./birdEpics";
import { birdObnservationsListEpic } from "./birdObservationsListEpics";
import { birdsListEpic } from "./birdsListEpics";
import { requestInitialDataEpic } from "./initialDataEpics";
import { navigationEpic } from "./navigationEpic";
import { observationEpic } from "./observationEpics";
import { observationListEpic } from "./observationListEpics";
import { verifyObservationEpic } from "./verificationEpics";

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
