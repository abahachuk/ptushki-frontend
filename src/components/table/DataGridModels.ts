import { GridColumn } from "../../utils/grid/columnsConfig";

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
  columnName: string;
  width: number;
}

export interface FilteringRule {
  columnName: string;
  value?: string;
}

export interface DataGridState<TFilters = Object> {
  fixedColumns: GridColumn[];
  hiddenColumns: string[];
  selection: string[];
  columnsOrder: GridColumn[];
  columnWidths: ColumnWidth[];
  pagination: PaginationState;
  filtering: FilteringRule[];
  sorting: Sorting[];
  search: string;
  filters: TFilters;
}
