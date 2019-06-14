import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { BIRD_OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/bird-info/columns";
import { BIRD_OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/bird-info/conf";
import {
  BirdObservationData,
  BirdObservationFilters
} from "../../app/features/bird-info/models";
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
  } as AsyncResource<BirdObservationData[]>,
  gridState: getDefaultDataGridState<BirdObservationFilters>(
    BIRD_OBSERVATION_GRID_COLUMN_NAMES
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
