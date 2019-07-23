import { Dictionary, pick } from "ramda";
import { ThunkAction } from "redux-thunk";
import {
  ActionCreator,
  createAsyncAction,
  createStandardAction,
  PayloadAC
} from "typesafe-actions";
import { AsyncActionBuilderConstructor } from "typesafe-actions/dist/create-async-action";
import { getFixedPartWidth } from "../../utils/grid/columnsConfig";
import { prefixActionCreator } from "../../utils/subspace/prefixActionCreator";
import {
  ColumnWidth,
  DataGridActions,
  FilteringRule,
  Sorting
} from "./DataGridModels";

// region internal
const getFiltersCreator = <TFilters extends {}>(
  namespace?: string
): AsyncActionBuilderConstructor<
  string,
  string,
  string,
  void,
  TFilters,
  string
> => {
  const prefix = namespace ? `${namespace}/` : "";
  return createAsyncAction(
    `${prefix}GET_GRID_FILTERS_REQUEST`,
    `${prefix}GET_GRID_FILTERS_SUCCESS`,
    `${prefix}GET_GRID_FILTERS_FAILURE`
  )<void, TFilters, string>();
};

const getDataCreator = <TData extends {}>(
  namespace?: string
): AsyncActionBuilderConstructor<
  string,
  string,
  string,
  FilteringRule[],
  TData,
  string
> => {
  const prefix = namespace ? `${namespace}/` : "";
  return createAsyncAction(
    `${prefix}GET_GRID_DATA_REQUEST`,
    `${prefix}GET_GRID_DATA_SUCCESS`,
    `${prefix}GET_GRID_DATA_FAILURE`
  )<FilteringRule[], TData, string>();
};

export const getFilters = getFiltersCreator<{}>();
export const getData = getDataCreator<{}>();
export const flush = createStandardAction("FLUSH")<void>();
export const setSorting = createStandardAction("SET_SORTING")<Sorting[]>();
export const setSearch = createStandardAction("SET_SEARCH")<string>();
export const setPage = createStandardAction("SET_PAGE")<number>();
export const setTotalCount = createStandardAction("SET_TOTAL_COUNT")<number>();
export const setPageSize = createStandardAction("SET_PAGE_SIZE")<number>();
export const setSelection = createStandardAction("SET_SELECTION")<string[]>();
export const setFilters = createStandardAction("SET_FILTERS")<
  FilteringRule[]
>();
export const setFixedPartWidth = createStandardAction("SET_FIXED_PART_WIDTH")<
  number
>();
export const setMounted = createStandardAction("SET_MOUNTED")<boolean>();

export const onColumnWidthsChangeThunk = (
  columnWidths: ColumnWidth[]
): ThunkAction<any, any, any, any> => (dispatch, getState) => {
  dispatch(
    setFixedPartWidth(getFixedPartWidth(columnWidths, getState().fixedColumns))
  );
};
// endregion

export const dataGridActions = <TData, TFilters>(
  namespace: string
): DataGridActions<TData, TFilters> => ({
  getData: getDataCreator<TData>(namespace),
  getFilters: getFiltersCreator<TFilters>(namespace),
  flush: prefixActionCreator(namespace, flush),
  setSorting: prefixActionCreator(namespace, setSorting),
  setSearch: prefixActionCreator(namespace, setSearch),
  setPage: prefixActionCreator(namespace, setPage),
  setPageSize: prefixActionCreator(namespace, setPageSize),
  setSelection: prefixActionCreator(namespace, setSelection),
  setFilters: prefixActionCreator(namespace, setFilters),
  setTotalCount: prefixActionCreator(namespace, setTotalCount),
  setMounted: prefixActionCreator(namespace, setMounted)
});

// for getting those actions, after which we need to re-request the data
export const dataGridActionsRequiringRequest = (
  actionsObj: DataGridActions<any, any>
): ActionCreator<any>[] =>
  Object.values(
    pick(
      ["setPage", "setPageSize", "setSearch", "setSorting", "setFilters"],
      actionsObj
    )
  );
