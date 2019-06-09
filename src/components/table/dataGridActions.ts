import { Dictionary, pick } from "ramda";
import { ThunkAction } from "redux-thunk";
import { ActionCreator, createStandardAction } from "typesafe-actions";
import { getFixedPartWidth } from "../../utils/grid/columnsConfig";
import { prefixActionCreator } from "../../utils/subspace/prefixActionCreator";
import { ColumnWidth, FilteringRule, Sorting } from "./DataGridModels";

// region internal
const addFiltersCreator = <TFilters = Object>() =>
  createStandardAction("ADD_FILTERS")<TFilters>();
export const addFilters = addFiltersCreator();
export const setSorting = createStandardAction("SET_SORTING")<Sorting[]>();
export const setSearch = createStandardAction("SET_SEARCH")<string>();
export const setPage = createStandardAction("SET_PAGE")<number>();
export const setPageSize = createStandardAction("SET_PAGE_SIZE")<number>();
export const setSelection = createStandardAction("SET_SELECTION")<string[]>();
export const setFilters = createStandardAction("SET_FILTERS")<
  FilteringRule[]
>();
export const setFixedPartWidth = createStandardAction("SET_FIXED_PART_WIDTH")<
  number
>();

export const onColumnWidthsChangeThunk = (
  columnWidths: ColumnWidth[]
): ThunkAction<any, any, any, any> => (dispatch, getState) => {
  dispatch(
    setFixedPartWidth(getFixedPartWidth(columnWidths, getState().fixedColumns))
  );
};
// endregion

export const dataGridActions = <TFilters>(namespace: string) => ({
  addFilters: prefixActionCreator(namespace, addFiltersCreator<TFilters>()),
  setSorting: prefixActionCreator(namespace, setSorting),
  setSearch: prefixActionCreator(namespace, setSearch),
  setPage: prefixActionCreator(namespace, setPage),
  setPageSize: prefixActionCreator(namespace, setPageSize),
  setSelection: prefixActionCreator(namespace, setSelection),
  setFilters: prefixActionCreator(namespace, setFilters)
});

// for getting those actions, after which we need to re-request the data
export const dataGridActionsRequiringRequest = (
  actionsObj: Dictionary<ActionCreator<any>>
): ActionCreator<any>[] =>
  Object.values(
    pick(
      ["setPage", "setPageSize", "setSearch", "setSorting", "setFilters"],
      actionsObj
    )
  );
