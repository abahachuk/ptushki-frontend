import {
  BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  BIRD_OBSERVATIONS_LIST_NAMESPACE
} from "../../app/features/birds/conf";
import {
  ObservationFilters,
  ObservationsResponse
} from "../../app/features/observations/models";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import {
  OBSERVATIONS_ENDPOINT,
  OBSERVATIONS_FILTERS_ENDPOINT
} from "../../config/endpoints";
import { observationGridActions } from "../actions/birdObservationsListActions";
import { setObservationVerificationStatus } from "../actions/verificationActions";

export const birdObnservationsListEpic = getDataGridEpics<
  ObservationsResponse,
  ObservationFilters
>(BIRD_OBSERVATIONS_LIST_NAMESPACE, BIRD_OBSERVATIONS_GRID_STATE_SELECTOR, {
  gridStateSelector: BIRD_OBSERVATIONS_GRID_STATE_SELECTOR,
  gridEndpoint: OBSERVATIONS_ENDPOINT,
  filtersEndpoint: OBSERVATIONS_FILTERS_ENDPOINT,
  gridActions: observationGridActions,
  actionsRequiringRequest: [setObservationVerificationStatus.success]
});
