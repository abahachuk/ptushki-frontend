import reduceReducer from "reduce-reducers";
import combineSectionReducers from "combine-section-reducers";
import { observationsData } from "../actions/observationListActions";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import {
  getColumnWidths,
  getFixedColumns,
  GridColumn
} from "../../utils/grid/columnsConfig";
import { OBSERVATIONS_LIST_NAMESPACE } from "../../app/features/observations/conf";
import { createDataGridReducer } from "../../components/table/dataGridReducer";
import { DataGridState } from "../../components/table/DataGridModels";

export interface TmpObservation {
  id: string;
  verified: boolean;
  firstName: string;
  lastName: string;
}

const OBSERVATION_GRID_COLUMNS = [
  GridColumn.id,
  GridColumn.verified,
  GridColumn.firstName,
  GridColumn.lastName
];

const initialState = {
  observations: {
    value: [],
    isLoading: true,
    error: null as string
  } as AsyncResource<TmpObservation[]>,
  gridState: {
    fixedColumns: getFixedColumns(OBSERVATION_GRID_COLUMNS),
    hiddenColumns: [] as string[],
    columnsOrder: OBSERVATION_GRID_COLUMNS,
    columnWidths: getColumnWidths(OBSERVATION_GRID_COLUMNS),
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
