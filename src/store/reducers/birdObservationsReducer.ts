import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/observations/columns";
import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/bird-info/conf";
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
import { birdObservationsData } from "../actions/birdObservationsListActions";

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

export const birdObservationsListReducer = reduceReducer(
  initialState,

  combineSectionReducers({
    observations: createAsyncStateReducer(
      initialState.observations,
      birdObservationsData
    ),
    gridState: createDataGridReducer(
      initialState.gridState,
      BIRD_OBSERVATIONS_LIST_NAMESPACE
    )
  })
);
