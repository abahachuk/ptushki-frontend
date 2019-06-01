import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import { namespaced } from "redux-subspace";
import {
  addFilters,
  setFilters,
  setPage,
  setPageSize,
  setSearch,
  setSelection,
  setSorting
} from "./dataGridActions";
import { DataGridState } from "./DataGridModels";

export const createDataGridReducer = (
  initialState: DataGridState,
  namespace: string
) =>
  namespaced(namespace)(
    reduceReducer(
      initialState,

      handleAction(
        addFilters,
        (state, action) => ({
          ...state,
          filters: action.payload
        }),
        initialState
      ),

      handleAction(
        setSorting,
        (state, action) => ({
          ...state,
          sorting: action.payload
        }),
        initialState
      ),

      handleAction(
        setSearch,
        (state, action) => ({
          ...state,
          search: action.payload
        }),
        initialState
      ),

      handleAction(
        setSelection,
        (state, action) => ({
          ...state,
          selection: action.payload
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
    )
  );
