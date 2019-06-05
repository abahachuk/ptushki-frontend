import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/observations/columns";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import {
  ObservationData,
  ObservationFilters
} from "../../app/features/observations/models";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import { getDefaultDataGridState } from "../../utils/grid/defaultGridState";
import { observationsData } from "../actions/observationListActions";

const initialState = {
  observations: {
    value: [],
    isLoading: true,
    error: null as string
  } as AsyncResource<ObservationData[]>,
  gridState: getDefaultDataGridState<ObservationFilters>(
    OBSERVATION_GRID_COLUMN_NAMES
  )
};

export const observationListReducer = reduceReducer(
  initialState,

  combineSectionReducers({
    observations: createAsyncStateReducer(
      initialState.observations,
      observationsData
    ),
    gridState: createDataGridReducer(
      initialState.gridState,
      OBSERVATIONS_LIST_NAMESPACE
    )
  })
);
