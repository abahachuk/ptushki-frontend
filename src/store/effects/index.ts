import { combineEpics } from "redux-observable";
import { birdsListEpic } from "./birdsListEpics";
import { navigationEpic } from "./navigationEpic";
import { observationListEpic } from "./observationListEpics";
import { birdObnservationsListEpic } from "./birdObservationsListEpics";
import { verifyObservationEpic } from "./verificationEpics";
import { requestInitialDataEpic } from "./initialDataEpics";
import { requestAddObservationEpic } from "./addObservationEpics";

export const rootEpic = combineEpics(
  observationListEpic,
  birdsListEpic,
  birdObnservationsListEpic,
  verifyObservationEpic,
  navigationEpic,
  requestInitialDataEpic,
  requestAddObservationEpic
);
