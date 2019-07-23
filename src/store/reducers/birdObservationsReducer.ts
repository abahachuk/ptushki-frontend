import { OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/observations/columns";
import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import {
  ObservationData,
  ObservationFilters
} from "../../app/features/observations/models";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import { getDefaultDataGridState } from "../../components/table/defaultGridState";

const initialState = getDefaultDataGridState<
  ObservationData[],
  ObservationFilters
>(OBSERVATION_GRID_COLUMN_NAMES);

export const birdObservationsListReducer = createDataGridReducer<
  ObservationData[],
  ObservationFilters
>(initialState, BIRD_OBSERVATIONS_LIST_NAMESPACE);
