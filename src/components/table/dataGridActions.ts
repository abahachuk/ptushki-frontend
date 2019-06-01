import { createStandardAction } from "typesafe-actions";
import { prefixActionCreator } from "../../utils/subspace/prefixActionCreator";
import { FilteringRule, Sorting } from "./DataGridModels";

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
