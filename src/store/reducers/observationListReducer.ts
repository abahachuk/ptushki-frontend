import { OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/observations/columns";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
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

export const observationListReducer = createDataGridReducer(
  initialState,
  OBSERVATIONS_LIST_NAMESPACE
);
