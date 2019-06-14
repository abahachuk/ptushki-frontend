import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/bird-info/conf";
import {
  BirdObservationData,
  BirdObservationFilters,
  VerificationStatus
} from "../../app/features/bird-info/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const birdObservationsData = createAsyncAction(
  "BIRD_OBSERVATIONS_REQUEST",
  "BIRD_OBSERVATIONS_SUCCESS",
  "BIRD_OBSERVATIONS_FAILURE"
)<void, BirdObservationData[], string>();

export const observationsFiltersRequest = createStandardAction(
  "BIRD_OBSERVATIONS_FILTERS_REQUEST"
)();

export const setObservationVerificationStatus = createAsyncAction(
  "SET_BIRD_VERIFICATION_STATUS_REQUEST",
  "SET_BIRD_VERIFICATION_STATUS_SUCCESS",
  "SET_BIRD_VERIFICATION_STATUS_FAILURE"
)<
  {
    id: string;
    verificationStatus: VerificationStatus;
  },
  any,
  string
>();

export const observationGridActions = dataGridActions<BirdObservationFilters>(
  BIRD_OBSERVATIONS_LIST_NAMESPACE
);
