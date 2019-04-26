import { createStandardAction } from "typesafe-actions";
import { prefixActionCreator } from "../../utils/subspace/prefixActionCreator";
import { FilteringRule, Sorting } from "./DataGridModels";

// region internal
export const setSorting = createStandardAction("SET_SORTING")<Sorting[]>();
export const setPage = createStandardAction("SET_PAGE")<number>();
export const setPageSize = createStandardAction("SET_PAGE_SIZE")<number>();
export const setSelection = createStandardAction("SET_SELECTION")<string[]>();
export const setFilters = createStandardAction("SET_FILTERS")<
  FilteringRule[]
>();
// endregion

export const dataGridActions = (namespace: string) => ({
  setSorting: prefixActionCreator(namespace, setSorting),
  setPage: prefixActionCreator(namespace, setPage),
  setPageSize: prefixActionCreator(namespace, setPageSize),
  setSelection: prefixActionCreator(namespace, setSelection),
  setFilters: prefixActionCreator(namespace, setFilters)
});
