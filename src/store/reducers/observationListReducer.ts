import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import combineSectionReducers from "combine-section-reducers";
import {
  observationsData,
  setFilters,
  setPage,
  setPageSize,
  setSorting
} from "../actions/observationListActions";
import {
  AsyncResource,
  createAsyncStateReducer
} from "../../utils/createAsyncStateReducer";
import {
  getColumnWidths,
  getFixedColumns,
  GridColumn
} from "../../utils/grid/columnsConfig";

export interface TmpObservation {
  id: string;
  verified: boolean;
  firstName: string;
  lastName: string;
}

export interface Sorting {
  columnName: string;
  direction: "asc" | "desc";
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

export interface ColumnWidth {
  width: number;
  columnName: string;
}

export interface FilteringRule {
  columnName: string;
  value?: string;
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
  fixedColumns: getFixedColumns(OBSERVATION_GRID_COLUMNS),
  hiddenColumns: [] as string[],
  columnsOrder: OBSERVATION_GRID_COLUMNS,
  columnWidths: getColumnWidths(OBSERVATION_GRID_COLUMNS),
  pagination: <PaginationState>{
    currentPage: 0,
    pageSize: 15,
    totalCount: 50
  },
  filtering: [] as FilteringRule[],
  sorting: [] as Sorting[]
};

export const observationListReducer = reduceReducer(
  initialState,

  combineSectionReducers({
    observations: createAsyncStateReducer(
      initialState.observations,
      observationsData
    )
  } as any),

  handleAction(
    setSorting,
    (state, action) => ({
      ...state,
      sorting: action.payload
    }),
    initialState
  ),

  handleAction(
    setFilters,
    (state, action) => ({
      ...state,
      filtering: action.payload
    }),
    initialState
  ),

  handleAction(
    setPage,
    (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload
      }
    }),
    initialState
  ),

  handleAction(
    setPageSize,
    (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        pageSize: action.payload
      }
    }),
    initialState
  )
);
