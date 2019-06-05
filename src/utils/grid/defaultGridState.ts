import { DataGridState } from "../../components/table/DataGridModels";
import {
  getColumnWidths,
  getFixedColumns,
  getFixedPartWidth,
  GridColumn
} from "./columnsConfig";

export const defaultDataGridState: DataGridState<any> = {
  fixedColumns: [],
  hiddenColumns: [],
  selection: [],
  columnsOrder: [],
  columnWidths: [],
  pagination: {
    currentPage: 0,
    pageSize: 15,
    totalCount: 50
  },
  filtering: [],
  search: null,
  sorting: [],
  availableFilters: {},
  fixedPartWidth: 0
};

export const getDefaultDataGridState = <TFilters>(
  columnNames: GridColumn[]
): DataGridState<TFilters> => ({
  ...defaultDataGridState,
  fixedColumns: getFixedColumns(columnNames),
  columnsOrder: columnNames,
  columnWidths: getColumnWidths(columnNames),
  fixedPartWidth: getFixedPartWidth(
    getColumnWidths(columnNames),
    getFixedColumns(columnNames)
  )
});
