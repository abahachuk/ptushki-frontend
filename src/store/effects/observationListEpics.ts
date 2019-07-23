import {
  OBSERVATIONS_GRID_STATE_SELECTOR,
  OBSERVATIONS_LIST_NAMESPACE
} from "../../app/features/observations/conf";
import {
  ObservationFilters,
  ObservationsResponse
} from "../../app/features/observations/models";
import { getDataGridEpics } from "../../components/table/dataGridEpics";
import {
  OBSERVATIONS_ENDPOINT,
  OBSERVATIONS_FILTERS_ENDPOINT
} from "../../config/endpoints";
import { observationGridActions } from "../actions/observationListActions";
import { setObservationVerificationStatus } from "../actions/verificationActions";

export const observationListEpic = getDataGridEpics<
  ObservationsResponse,
  ObservationFilters
>(OBSERVATIONS_LIST_NAMESPACE, OBSERVATIONS_GRID_STATE_SELECTOR, {
  gridStateSelector: OBSERVATIONS_GRID_STATE_SELECTOR,
  gridEndpoint: OBSERVATIONS_ENDPOINT,
  filtersEndpoint: OBSERVATIONS_FILTERS_ENDPOINT,
  gridActions: observationGridActions,
  actionsRequiringRequest: [setObservationVerificationStatus.success]
});
