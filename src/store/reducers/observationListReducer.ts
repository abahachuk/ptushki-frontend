import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { OBSERVATION_GRID_COLUMN_NAMES } from "../../app/features/observations/cells/observationsGridColumns";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import { ObservationData } from "../../app/features/observations/models";
import { DataGridState } from "../../components/table/DataGridModels";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import {
  getColumnWidths,
  getFixedColumns
} from "../../utils/grid/columnsConfig";
import { observationsData } from "../actions/observationListActions";

const initialState = {
  observations: {
    value: [],
    isLoading: true,
    error: null as string
  } as AsyncResource<ObservationData[]>,
  gridState: {
    fixedColumns: getFixedColumns(OBSERVATION_GRID_COLUMN_NAMES),
    hiddenColumns: [],
    selection: [],
    columnsOrder: OBSERVATION_GRID_COLUMN_NAMES,
    columnWidths: getColumnWidths(OBSERVATION_GRID_COLUMN_NAMES),
    pagination: {
      currentPage: 0,
      pageSize: 15,
      totalCount: 50
    },
    filtering: [],
    sorting: []
  } as DataGridState
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
