import { createAsyncAction } from "typesafe-actions";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import {
  ObservationData,
  VerificationStatus
} from "../../app/features/observations/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const observationsData = createAsyncAction(
  "OBSERVATIONS_REQUEST",
  "OBSERVATIONS_SUCCESS",
  "OBSERVATIONS_FAILURE"
)<void, ObservationData[], string>();

export const setObservationVerificationStatus = createAsyncAction(
  "SET_VERIFICATION_STATUS_REQUEST",
  "SET_VERIFICATION_STATUS_SUCCESS",
  "SET_VERIFICATION_STATUS_FAILURE"
)<
  {
    id: string;
    verificationStatus: VerificationStatus;
  },
  any,
  string
>();

export const observationGridActions = dataGridActions(
  OBSERVATIONS_LIST_NAMESPACE
);
