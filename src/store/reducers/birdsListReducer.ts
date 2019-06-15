import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import { BIRDS_GRID_COLUMN_NAMES } from "../../app/features/birds/columns";
import { BIRDS_LIST_NAMESPACE } from "../../app/features/birds/conf";
import { BirdData, BirdFilters } from "../../app/features/birds/models";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import { getDefaultDataGridState } from "../../utils/grid/defaultGridState";
import { birdsData, birdsFlush } from "../actions/birdsListActions";

const initialState = {
  birds: {
    value: [],
    isLoading: true,
    error: null as string
  } as AsyncResource<BirdData[]>,
  gridState: getDefaultDataGridState<BirdFilters>(BIRDS_GRID_COLUMN_NAMES)
};

export const birdsListReducer = reduceReducer(
  initialState,

  combineSectionReducers({
    birds: createAsyncStateReducer(initialState.birds, birdsData),
    gridState: createDataGridReducer(
      initialState.gridState,
      BIRDS_LIST_NAMESPACE
    )
  }),

  handleAction(
    birdsFlush,
    () => ({
      ...initialState
    }),
    initialState
  )
);
