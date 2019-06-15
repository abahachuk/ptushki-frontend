import { createAsyncAction, createStandardAction } from "typesafe-actions";
import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/bird-info/conf";
import {
  ObservationData,
  ObservationFilters
} from "../../app/features/observations/models";
import { dataGridActions } from "../../components/table/dataGridActions";

export const birdObservationsData = createAsyncAction(
  "BIRD_OBSERVATIONS_REQUEST",
  "BIRD_OBSERVATIONS_SUCCESS",
  "BIRD_OBSERVATIONS_FAILURE"
)<void, ObservationData[], string>();

export const observationsFiltersRequest = createStandardAction(
  "BIRD_OBSERVATIONS_FILTERS_REQUEST"
)();

export const observationGridActions = dataGridActions<ObservationFilters>(
  BIRD_OBSERVATIONS_LIST_NAMESPACE
);
