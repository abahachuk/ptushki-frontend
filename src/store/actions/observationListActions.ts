import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import {
  ObservationData,
  ObservationFilters,
  VerificationStatus
} from "../../app/features/observations/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const observationsData = createAsyncAction(
  "OBSERVATIONS_REQUEST",
  "OBSERVATIONS_SUCCESS",
  "OBSERVATIONS_FAILURE"
)<void, ObservationData[], string>();

export const observationsFlush = createStandardAction("OBSERVATIONS_FLUSH")<
  void
>();

export const observationsFiltersRequest = createStandardAction(
  "OBSERVATIONS_FILTERS_REQUEST"
)();

export const observationGridActions = dataGridActions<ObservationFilters>(
  OBSERVATIONS_LIST_NAMESPACE
);
