import combineSectionReducers from "combine-section-reducers";
import reduceReducer from "reduce-reducers";
import { handleAction } from "redux-actions";
import { namespaced } from "redux-subspace";
import {
  getFilters,
  getData,
  setFilters,
  setFixedPartWidth,
  setMounted,
  setPage,
  setPageSize,
  setSearch,
  setSelection,
  setSorting,
  setTotalCount,
  flush
} from "./dataGridActions";
import { createAsyncStateReducer } from "../../utils/createAsyncStateReducer";
import { DataGridState } from "./DataGridModels";

export const createDataGridReducer = <TData, TFilters>(
  initialState: DataGridState<TData, TFilters>,
  namespace: string
) =>
  namespaced(namespace)(
    reduceReducer(
      initialState,

      // @ts-ignore
      combineSectionReducers({
        data: createAsyncStateReducer(initialState.data, getData)
      }),

      handleAction(
        flush,
        () => ({
          ...initialState
        }),
        initialState
      ),

      handleAction(
        getData.request,
        (state, action) => ({
          ...state,
          filtering: state.filtering.concat(action.payload || [])
        }),
        initialState
      ),

      handleAction(
        getFilters.success,
        (state, action) => ({
          ...state,
          availableFilters: action.payload
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
      ),

      handleAction(
        setTotalCount,
        (state, action) => ({
          ...state,
          pagination: {
            ...state.pagination,
            totalCount: action.payload
          }
        }),
        initialState
      ),

      handleAction(
        setFixedPartWidth,
        (state, action) => ({
          ...state,
          fixedPartWidth: action.payload
        }),
        initialState
      ),

      handleAction(
        setMounted,
        (state, action) => ({
          ...state,
          isMounted: action.payload
        }),
        initialState
      )
    )
  );
