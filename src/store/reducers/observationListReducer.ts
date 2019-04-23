import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import {
  setFilters,
  setPage,
  setPageSize,
  setSorting
} from "../actions/observationListActions";

export interface TmpObservation {
  id: string;
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
  observations: [
    { id: "1234", firstName: "first", lastName: "value" },
    { id: "12345", firstName: "second", lastName: "value2" }
  ] as TmpObservation[],
  fixedColumns: ["id"],
  hiddenColumns: [] as string[],
  columnsOrder: ["id", "firstName", "lastName"],
  columnWidths: [
    { columnName: "id", width: 100 },
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
