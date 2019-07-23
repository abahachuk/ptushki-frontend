import { DataGridState } from "./DataGridModels";
import {
  getColumnWidths,
  getFixedColumns,
  getFixedPartWidth
} from "../../utils/grid/columnsConfig";
import { GridColumn } from "../../utils/grid/GridColumn";

export const getDefaultDataGridState = <TData, TFilters>(
  columnNames: GridColumn[]
): DataGridState<TData, TFilters> => ({
  hiddenColumns: [],
  selection: [],
  pagination: {
    currentPage: 0,
    pageSize: 15,
    totalCount: 50
  },
  filtering: [],
  search: undefined,
  sorting: [],
  availableFilters: {},
  isMounted: false,
  data: {
    isLoading: false,
    value: null,
    error: null
  },
  fixedColumns: getFixedColumns(columnNames),
  columnsOrder: columnNames,
  columnWidths: getColumnWidths(columnNames),
  fixedPartWidth: getFixedPartWidth(
    getColumnWidths(columnNames),
    getFixedColumns(columnNames)
  )
});
