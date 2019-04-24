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

const initialState = {
  observations: {
    value: [],
    isLoading: true,
    error: null as string
  } as AsyncResource<TmpObservation[]>,
  fixedColumns: ["id"],
  hiddenColumns: [] as string[],
  columnsOrder: ["id", "verified", "firstName", "lastName"],
  columnWidths: [
    { columnName: "id", width: 100 },
    { columnName: "verified", width: 200 },
    { columnName: "firstName", width: 200 },
    { columnName: "lastName", width: 300 }
  ] as ColumnWidth[],
  pagination: <PaginationState>{
    currentPage: 0,
    pageSize: 15,
    totalCount: 50
  },
  filtering: [] as FilteringRule[],
  sorting: [
    {
      columnName: "id",
      direction: "asc"
    }
  ] as Sorting[]
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
